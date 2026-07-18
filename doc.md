# Kế hoạch triển khai: Website chia sẻ & mua bán ảnh online (Next.js SSR)

## 1. Tổng quan mô hình

Hệ thống là một marketplace nội dung số (tương tự Shutterstock, Adobe Stock, 500px ở quy mô nhỏ hơn), gồm 3 vai trò chính:

- **Seller (Photographer):** upload, quản lý ảnh, nhận tiền bán
- **Buyer:** tìm kiếm, mua, download ảnh
- **Admin:** kiểm duyệt nội dung, quản lý giao dịch, xử lý tranh chấp

SSR (Server-Side Rendering) trên Next.js được dùng cho các trang công khai cần SEO tốt (trang chủ, chi tiết ảnh, danh mục, profile photographer). Các trang sau đăng nhập (dashboard, upload, quản lý đơn hàng) không cần SEO nên có thể dùng CSR hoặc SSR có auth tùy nhu cầu hiển thị dữ liệu real-time.

---

## 2. Luồng người dùng (User Roles & Onboarding)

### 2.1. Đăng ký / Đăng nhập
- Hỗ trợ một tài khoản có thể vừa mua vừa bán (giống Shutterstock), hoặc tách vai trò riêng tùy mô hình kinh doanh.
- Xác thực email bắt buộc.
- Có thể bổ sung đăng nhập qua Google/Facebook để giảm rào cản onboarding.

### 2.2. Seller onboarding
1. Đăng ký làm seller (từ tài khoản buyer có sẵn hoặc đăng ký mới).
2. Điền thông tin thanh toán (Stripe Connect / thông tin ngân hàng / ví điện tử).
3. Đồng ý điều khoản cam kết bản quyền: ảnh là của mình, không vi phạm bản quyền bên thứ ba.
4. (Tùy chọn) Admin duyệt seller trước khi cho phép upload bán — tùy mức độ kiểm soát chất lượng mong muốn.

---

## 3. Luồng upload và quản lý ảnh (Seller side)

### 3.1. Upload ảnh
- Seller upload file gốc (resolution cao, định dạng JPEG/PNG/RAW tùy hỗ trợ).
- Hệ thống tự động xử lý (nên chạy bất đồng bộ qua job queue, không chặn request chính):
  - Sinh ảnh watermark độ phân giải thấp để hiển thị công khai (chống ăn cắp ảnh).
  - Sinh thumbnail cho các trang listing.
  - Lưu file gốc vào storage **private**, chỉ giải phóng sau khi có giao dịch thành công.

### 3.2. Metadata
Seller cần điền:
- Tiêu đề, mô tả
- Tags/keywords (quan trọng cho tìm kiếm nội bộ và SEO)
- Danh mục (category)
- Loại giấy phép: Royalty-free, Rights-managed, Editorial use only
- Giá hoặc gói license (cá nhân / thương mại / extended)

### 3.3. Kiểm duyệt nội dung
- **Bước 1 — AI content moderation:** quét tự động để chặn ảnh nhạy cảm, vi phạm chính sách, hoặc nghi ngờ vi phạm bản quyền (reverse image search).
- **Bước 2 — Admin review (thủ công):** duyệt cuối cùng trước khi publish, đặc biệt với ảnh bị AI đánh dấu nghi vấn.

### 3.4. Trạng thái ảnh (Photo lifecycle)

```
Seller upload ảnh
      │
      ▼
Xử lý tự động (watermark, thumbnail, lưu trữ)
      │
      ▼
Kiểm duyệt (AI content + admin review)
      │
   ┌──┴───┐
   ▼      ▼
Bị từ chối   Publish công khai (SSR pages)
(sửa & nộp lại)   │
              ▼
        Buyer mua / download
              │
              ▼
   (hoặc bị seller/admin gỡ → archive)
```

Các trạng thái cụ thể: `pending_review` → `approved` / `rejected` → `published` → `unpublished` / `archived`.

---

## 4. Luồng tìm kiếm và mua hàng (Buyer side)

Đây là phần SSR đóng vai trò quan trọng nhất vì ảnh hưởng trực tiếp đến SEO và trải nghiệm người dùng chưa đăng nhập.

### 4.1. Khám phá ảnh
- Trang chủ: hiển thị ảnh nổi bật / mới nhất (SSR hoặc ISR).
- Trang danh mục theo chủ đề (thiên nhiên, business, food, v.v.).
- Trang tìm kiếm với filter: màu sắc, orientation, loại license, khoảng giá.
  - Lần load đầu nên SSR (bắt được query phổ biến cho SEO), các tương tác filter tiếp theo có thể chuyển sang client-side.

### 4.2. Trang chi tiết ảnh
- Trang quan trọng nhất về SEO — bắt buộc SSR hoặc SSG kèm revalidate (ISR).
- Hiển thị: ảnh watermark, thông tin photographer, các mức giá license, ảnh liên quan.
- Cần có structured data (Schema.org `ImageObject`) để Google Images index tốt.

### 4.3. Giỏ hàng và checkout
1. Buyer chọn loại license (cá nhân / thương mại).
2. Thêm vào giỏ — có thể gồm ảnh từ nhiều seller khác nhau.
3. Thanh toán qua cổng thanh toán (Stripe / VNPay / Momo tùy thị trường mục tiêu).
4. **Chỉ sau khi thanh toán thành công** mới generate link download file gốc (nên có thời hạn hoặc giới hạn số lần download để giảm rủi ro chia sẻ trái phép).

---

## 5. Luồng thanh toán và chia tiền (Payment & Payout)

1. **Buyer thanh toán** → tiền vào ví trung gian (escrow) của hệ thống, chưa chuyển ngay cho seller.
2. **Tính commission** → hệ thống giữ lại phần trăm hoa hồng (ví dụ 20–30%), phần còn lại ghi nhận vào ví seller.
3. **Seller withdraw** → seller yêu cầu rút tiền theo định kỳ (tuần/tháng) hoặc khi đạt ngưỡng tối thiểu; có thể qua admin duyệt hoặc tự động qua Stripe Connect.
4. **Refund / dispute** → cần chính sách rõ ràng, ví dụ: ảnh đã download thì không hoàn tiền trừ khi chứng minh được vi phạm bản quyền.

---

## 6. Luồng license và bảo vệ bản quyền

Đây là điểm khác biệt lớn nhất so với e-commerce thông thường:

- Mỗi giao dịch sinh ra **license certificate** (PDF hoặc record trong DB) ghi rõ: người mua, ảnh đã mua, loại license, phạm vi sử dụng được phép — để buyer chứng minh quyền sử dụng hợp pháp khi cần.
- Cần cơ chế **report vi phạm bản quyền** (tương tự DMCA) để bên thứ ba báo cáo nếu phát hiện ảnh bị đăng trộm.
- **Watermark + chặn right-click/drag** trên ảnh preview để hạn chế (không ngăn được hoàn toàn) việc lấy ảnh chưa mua.

---

## 7. Kiến trúc render cho Next.js

| Trang | Render mode | Lý do |
|---|---|---|
| Trang chủ, danh mục | SSR / ISR | Cần SEO, nội dung thay đổi thường xuyên nhưng không cần real-time |
| Chi tiết ảnh | SSR / ISR + revalidate | SEO tối quan trọng, cần Schema.org markup |
| Tìm kiếm | SSR cho lần load đầu, CSR cho filter tiếp theo | Cân bằng SEO và UX |
| Dashboard seller/buyer | CSR hoặc SSR có auth | Không cần SEO, cần dữ liệu real-time |
| Checkout | CSR | Tương tác nhiều, không cần index |

---

## 8. Kiến trúc hệ thống phía sau (Backend infrastructure)

- **Database:** quan hệ (PostgreSQL) cho users, photos, orders, licenses, transactions.
- **Object storage:** S3 hoặc tương đương, tách riêng:
  - Bucket **public** chứa ảnh watermark/thumbnail.
  - Bucket **private** chứa file gốc, chỉ truy cập qua signed URL sau khi mua.
- **Job queue:** (BullMQ + Redis) xử lý ảnh upload bất đồng bộ — resize, watermark, AI moderation — để không chặn request chính.
- **CDN:** đặt trước storage để ảnh preview load nhanh trên toàn cầu.
- **Payment gateway:** Stripe (quốc tế) hoặc VNPay/Momo (thị trường Việt Nam), kèm Stripe Connect nếu cần tự động payout cho seller.

---

## 9. Gợi ý thứ tự triển khai (Implementation roadmap)

1. **Giai đoạn nền tảng:** Auth, schema database cơ bản (users, photos, orders), upload ảnh + lưu trữ.
2. **Giai đoạn nghiệp vụ cốt lõi:** Kiểm duyệt ảnh (admin trước, AI sau), trang chi tiết ảnh SSR, giỏ hàng, thanh toán cơ bản.
3. **Giai đoạn hoàn thiện marketplace:** Hệ thống license certificate, ví seller, payout, dashboard seller/buyer.
4. **Giai đoạn tối ưu:** SEO nâng cao (structured data, sitemap, ISR tuning), AI content moderation, cơ chế report vi phạm bản quyền, tối ưu CDN/storage.

---

## 10. Các điểm cần quyết định sớm (Open questions)

- Mô hình tài khoản: một tài khoản vừa mua vừa bán, hay tách riêng?
- Admin duyệt seller trước khi cho upload, hay mở tự do và chỉ duyệt từng ảnh?
- Cổng thanh toán: quốc tế (Stripe) hay nội địa (VNPay/Momo) hay cả hai?
- Mức hoa hồng (commission) và chu kỳ payout cho seller?
- Có cần OCR/reverse image search để chống ảnh vi phạm bản quyền ngay từ bước upload không, hay xử lý hậu kiểm qua report?