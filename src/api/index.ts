import request from "@/service/request";
import { jsonToFormData } from '@/utils/index.ts'

// 智能查询
export function getKeyWord(data: any) {
  return request({
    url: '',
    method: 'POST',
    data: jsonToFormData(data)
  })
}
