// 定義 User 接口，對應使用者資料結構
export interface IUser extends Document {
  name: string;
  age: number;
  email: string;
  account: string;
  password: string;
  role: "user" | "admin";
  approved: boolean;
}
