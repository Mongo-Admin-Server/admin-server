import { ErrorCode } from '@/api/src/Classes/Errors/ErrorCode';
import { StructuredErrors } from '@/api/src/Classes/Errors/StructuredErrors';

export interface IApiError {
  code: ErrorCode,
  structured: StructuredErrors,
  message?: string,
  details?: any,
}