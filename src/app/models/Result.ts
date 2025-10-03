export interface Result<t> {
  success: boolean;
  errors?: string[];
  data?: t;
}