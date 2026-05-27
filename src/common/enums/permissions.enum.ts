export enum Permissions {

  // Productos
  CreateProduct = 'CREATE_PRODUCT',
  ReadProduct = 'READ_PRODUCT',
  UpdateProduct = 'UPDATE_PRODUCT',
  DeleteProduct = 'DELETE_PRODUCT',
  ViewAllProducts = 'VIEW_ALL_PRODUCTS',
  
  // Usuarios
  CreateUser = 'CREATE_USER',
  ReadUser = 'READ_USER',
  UpdateUser = 'UPDATE_USER',
  DeleteUser = 'DELETE_USER',
  ViewAllUsers = 'VIEW_ALL_USERS',
  ManageClubEmployees = 'MANAGE_CLUB_EMPLOYEES',
  
  // Reportes y pagos
  ViewReports = 'VIEW_REPORTS',
  ViewSystemStats = 'VIEW_SYSTEM_STATS',
  GeneratePay = 'GENERATE_PAY',
  RefundPay = 'REFUND_PAY'
}