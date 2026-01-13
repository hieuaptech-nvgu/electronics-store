// footer.mock.js
import FooterLogo from "../../../../assets/images/footerLogo.png";
import { Facebook } from "lucide-react";

export const footerAbout = {
  title: "Về TTG",
  description:
    "Trang thương mại chính thức của Dũng CT - Trực Tiếp Game. Luôn tìm kiếm những sản phẩm vì game thủ.",
  logo: "https://via.placeholder.com/100x40?text=TTG", // logo nếu cần
  badges: FooterLogo,
};

export const footerContact = {
  title: "Thông tin liên hệ",
  addresses: [
    "CS1: 83 - 85 Thái Hà - Đống Đa - HN",
    "CS2: 83A Cửu Long - Phường 15 - Q10 - TP.HCM",
  ],
  phones: ["087.997.9997", "098.655.2233"],
  email: "ttgshoponline@gmail.com",
};

export const footerBank = {
  title: "Tài Khoản Ngân Hàng",
  links: [
    { text: "Tài Khoản Ngân Hàng", href: "#" },
    { text: "Tìm kiếm", href: "#" },
    { text: "Phương thức thanh toán", href: "#" },
  ],
};

export const footerPolicy = {
  title: "Chính sách",
  links: [
    { text: "Chính Sách Bảo Mật", href: "#" },
    { text: "Qui Định Bảo Hành", href: "#" },
    { text: "Chính Sách Đổi Trả", href: "#" },
    { text: "Điều khoản sử dụng", href: "#" },
    { text: "Chính sách vận chuyển & kiểm hàng", href: "#" },
    {
      text: "Phân định trách nhiệm của tổ chức cung ứng dịch vụ logistics",
      href: "#",
    },
  ],
};

export const footerSocials = [
  { type: "facebook", href: "#" },
  { type: "twitter", href: "#" },
  { type: "instagram", href: "#" },
  { type: "google", href: "#" },
  { type: "youtube", href: "#" },
];
