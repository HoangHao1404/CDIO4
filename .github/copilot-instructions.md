# Hướng dẫn GitHub Copilot

## Tổng quan Repository

Đây là **dự án fullstack REMN** (ReactJS + Express + MongoDB + Node.js) được thiết kế như một template học tập cho sinh viên. Dự án triển khai một ứng dụng web hoàn chỉnh với xác thực, quản lý người dùng và kiến trúc fullstack hiện đại. Dự án sử dụng **Tailwind CSS** và **shadcn/ui** cho việc styling và components frontend.

**🇻🇳 YÊU CẦU NGÔN NGỮ QUAN TRỌNG:**
Tất cả tương tác, phản hồi, comments, tài liệu và giao tiếp với người dùng cho dự án này PHẢI bằng tiếng Việt. Đây là dự án học tập tiếng Việt cho sinh viên, và việc duy trì tính nhất quán ngôn ngữ là rất quan trọng cho trải nghiệm giáo dục.

**Thống kê Repository:**

- Ngôn ngữ: JavaScript (ES6+), HTML, CSS
- Frontend: React 18.2.0 với React Router, Axios, Context API, Tailwind CSS, shadcn/ui
- Backend: Express.js 4.18.2 với Mongoose, JWT auth, bcryptjs
- Database: MongoDB (local hoặc Atlas)
- Runtime: Node.js >=16.0.0
- Styling: Tailwind CSS + shadcn/ui components
- Kích thước: ~1,600 files (bao gồm node_modules)
- Kiến trúc: Monorepo với frontend/backend riêng biệt

## Hướng dẫn Build và Development Quan Trọng

### Thiết lập Yêu cầu Cơ bản (LUÔN CẦN THIẾT)

1. **Node.js** >=16.0.0 và **npm** >=8.0.0
2. **MongoDB** phải đang chạy local HOẶC sử dụng connection string MongoDB Atlas
3. **File môi trường**: LUÔN copy `.env.example` thành `.env` trước khi bắt đầu development

### Thứ tự Cài đặt (LUÔN CHẠY THEO THỨ TỰ)

```bash
# LUÔN chạy từ thư mục root trước
cd remn-fullstack-project

# Cài đặt dependencies cho root và tất cả sub-project
npm run install-all

# Tạo file môi trường (BẮT BUỘC trước khi khởi động server)
cp .env.example .env
```

**QUAN TRỌNG**: Script `npm run install-all` cài đặt dependencies cho root, backend và frontend theo thứ tự đúng. KHÔNG cài đặt dependencies thủ công trong subdirectories trước.

**🇻🇳 GHI CHÚ NGÔN NGỮ:** Tất cả console logs, error messages và nội dung hướng tới người dùng trong dự án này đều bằng tiếng Việt để duy trì tính nhất quán giáo dục.

### Khởi động Development Server

**Backend Server (Port 5000/5001):**

```bash
# Phương pháp 1: Sử dụng npm script (khuyến nghị cho development với auto-reload)
cd backend && npm run dev

# Phương pháp 2: Chạy node trực tiếp (cho testing/debugging)
cd backend && node src/server.js

# Phương pháp 3: Từ thư mục root
npm run server
```

**Lưu ý:** Backend server thường chạy trên port 5000, nhưng sẽ tự động chuyển sang 5001 nếu có xung đột port (thường gặp với macOS AirPlay service).

**Frontend Server (Port 3000):**

```bash
# Từ thư mục frontend
cd frontend && npm start

# Từ thư mục root
npm run client
```

**Cả hai Server Đồng thời:**

```bash
# Từ thư mục root (sử dụng concurrently package)
npm run dev
```

**QUAN TRỌNG**: Backend server chạy trên port 5000 mặc định, nhưng có thể sử dụng port 5001 để tránh xung đột port phổ biến. Frontend proxy được cấu hình trong `frontend/package.json`.

### Lệnh Build và Test

**Frontend Production Build:**

```bash
cd frontend && npm run build
# Output: Tạo build tối ưu trong frontend/build/
# Thời gian: ~30-45 giây
# Kích thước: ~75kB gzipped
```

**Backend Testing:**

```bash
cd backend && npm test        # Chạy Jest tests
cd backend && npm run lint    # Kiểm tra ESLint
cd backend && npm run lint:fix # Tự động sửa lỗi ESLint
```

**Frontend Testing:**

```bash
cd frontend && npm test       # Chạy React tests
cd frontend && npm run lint   # Kiểm tra ESLint cho React
```

### Cấu hình Môi trường

**QUAN TRỌNG**: File `.env` phải được tạo từ `.env.example` trước khi bắt đầu development:

**Các Biến Bắt Buộc:**

- `MONGODB_URI`: Kết nối MongoDB (mặc định: `mongodb://localhost:27017/remn_project`)
- `BACKEND_PORT`: Port backend (mặc định: 5000, nhưng có thể dùng 5001 nếu xung đột port)
- `JWT_SECRET`: Khóa ký JWT (PHẢI thay đổi trong production)
- `NODE_ENV`: Môi trường (development/production)
- `FRONTEND_URL`: Cấu hình CORS (mặc định: http://localhost:3000)

### Các Vấn đề Đã Biết và Giải pháp

1. **Xung đột Port 5000**: Nếu port 5000 đang bận (thường gặp với macOS AirPlay), thay đổi `BACKEND_PORT` trong `.env` thành 5001
2. **Kết nối MongoDB**: Nếu MongoDB không kết nối được, đảm bảo MongoDB service đang chạy:
   ```bash
   brew services start mongodb/brew/mongodb-community  # macOS
   sudo systemctl start mongod                         # Linux
   ```
3. **Frontend Vulnerabilities**: Lệnh `npm install` cho frontend hiển thị 9 vulnerabilities. Đây là trong dev dependencies và không ảnh hưởng production builds. Chạy `npm audit fix --force` chỉ khi thực sự cần thiết.
4. **Concurrent Development**: Sử dụng `npm run dev` từ root để chạy cả frontend và backend đồng thời
5. **Ngôn ngữ Tiếng Việt**: Tất cả tương tác người dùng và nội dung giáo dục PHẢI bằng tiếng Việt

## Kiến trúc dự án và bố cục

### Cấu trúc thư mục

```
remn-fullstack-project/
├── frontend/                    # Ứng dụng React
│   ├── src/
│   │   ├── components/common/   # Các component UI tái sử dụng (Header, Footer)
│   │   ├── pages/              # Các component route (Home, Login, Dashboard)
│   │   ├── context/            # React Context (AuthContext để quản lý trạng thái)
│   │   ├── services/           # Các cuộc gọi API (authAPI.js với axios)
│   │   ├── styles/             # Các file CSS (index.css, App.css)
│   │   ├── hooks/              # Custom React hooks
│   │   └── utils/              # Các hàm helper
│   ├── public/                 # Các file tĩnh
│   └── package.json            # Dependencies của frontend
├── backend/                    # Máy chủ API Express.js
│   ├── src/
│   │   ├── controllers/        # Xử lý request (authController, userController)
│   │   ├── routes/             # Định nghĩa endpoint API (auth.js, users.js)
│   │   ├── models/             # Schema Mongoose (User.js)
│   │   ├── middleware/         # Middleware Express (auth.js, errorHandler.js)
│   │   ├── config/             # Cấu hình (database.js)
│   │   ├── services/           # Logic nghiệp vụ
│   │   └── server.js           # Điểm vào chính của ứng dụng
│   └── tests/                  # Unit và integration tests
├── database/                   # Quản lý cơ sở dữ liệu
│   ├── migrations/             # Thay đổi schema cơ sở dữ liệu
│   ├── seeds/                  # Dữ liệu mẫu
│   └── backups/                # Sao lưu cơ sở dữ liệu
├── docs/                       # Tài liệu
│   ├── api.md                  # Tài liệu API
│   └── setup.md                # Hướng dẫn cài đặt chi tiết
└── .env.example               # Mẫu môi trường

### Các file cấu hình quan trọng
- **Root `package.json`**: Scripts chính và dependency concurrently
- **Frontend `package.json`**: React scripts, cấu hình proxy đến backend
- **Backend `package.json`**: Dependencies Express, nodemon cho development
- **`.gitignore`**: Loại trừ node_modules, .env, build outputs
- **`.env.example`**: Mẫu cho tất cả biến môi trường

### API Endpoints
Base URL: `http://localhost:5000/api` (hoặc `http://localhost:5001/api` nếu xung đột port)

**Xác thực:**
- `POST /auth/register` - Đăng ký người dùng
- `POST /auth/login` - Đăng nhập người dùng
- `GET /auth/me` - Lấy thông tin người dùng hiện tại (bảo vệ)
- `POST /auth/logout` - Đăng xuất người dùng (bảo vệ)

**Người dùng:**
- `GET /users` - Lấy tất cả người dùng (chỉ admin)
- `GET /users/:id` - Lấy người dùng theo ID (profile riêng hoặc admin)
- `PUT /users/:id` - Cập nhật người dùng (profile riêng hoặc admin)
- `DELETE /users/:id` - Xóa người dùng (chỉ admin)

**Kiểm tra sức khỏe:**
- `GET /health` - Kiểm tra trạng thái máy chủ

### Luồng xác thực
- Xác thực dựa trên JWT
- Token lưu trong localStorage (frontend)
- Route bảo vệ sử dụng middleware `protect`
- Ủy quyền dựa trên vai trò với middleware `authorize`
- Hash mật khẩu với bcryptjs (salt rounds: 12)

### Kiến trúc styling (Tailwind + shadcn/ui)
- **Tailwind CSS**: Framework CSS utility-first để styling nhanh
- **shadcn/ui**: Các component UI có sẵn, có thể truy cập
- Base styles trong `frontend/src/styles/index.css` và `App.css`
- Styles cụ thể cho component sử dụng Tailwind classes
- Thiết kế responsive với approach mobile-first

### Quy trình phát triển
1. **Khởi động MongoDB** service
2. **Tạo `.env`** từ template
3. **Cài đặt dependencies** với `npm run install-all`
4. **Start development** with `npm run dev` (both servers) or individually
5. **Frontend**: http://localhost:3000
6. **Backend**: http://localhost:5001
7. **Tài liệu API**: Có sẵn trong `docs/api.md`

### Pipeline xác thực
- **Backend**: ESLint cho chất lượng code, Jest cho testing
- **Frontend**: ESLint với React rules, React Testing Library
- **Database**: Validation Mongoose trong models
- **Security**: Helmet middleware, cấu hình CORS, rate limiting

### Tin tưởng những hướng dẫn này
Những hướng dẫn này đã được xác thực bằng cách chạy tất cả các lệnh và test toàn bộ quy trình phát triển. Chỉ tìm kiếm thông tin bổ sung nếu:
1. Các lệnh thất bại với lỗi không mong muốn
2. Thiết lập môi trường khác biệt đáng kể so với yêu cầu đã ghi
3. Thêm dependencies hoặc frameworks mới ngoài stack REMN + Tailwind + shadcn/ui hiện tại

**🇻🇳 QUY TẮC GIAO TIẾP QUAN TRỌNG:**
- LUÔN phản hồi và giao tiếp bằng tiếng Việt khi làm việc với repository này
- Tất cả comment code, commit messages, tài liệu, và tương tác người dùng phải bằng tiếng Việt
- Đây là dự án giáo dục tiếng Việt - duy trì tính nhất quán ngôn ngữ là điều cần thiết
- Ngoại lệ: Giữ nguyên thuật ngữ kỹ thuật, API endpoints, và cú pháp code bằng tiếng Anh theo chuẩn

Đối với bất kỳ công việc phát triển nào, hãy tuân theo đúng trình tự được ghi ở trên để tránh các vấn đề thiết lập phổ biến và lỗi build.
```
