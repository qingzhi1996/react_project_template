import{ useEffect } from 'react';
import get from 'lodash/get'
import { message } from 'antd';

/**
 * json对象转化成formData类型
 * @param {Object} sourceData json数据
 * @param {FormData}
 * */
export function jsonToFormData(sourceData: any, noNeedId?: boolean) {
  // 将参数转化成formData格式
  if (!noNeedId) {
    sourceData.userId = localStorage.getItem('userId');
    sourceData.companyId = localStorage.getItem('companyId');
  }
  const _formDataParams = new FormData();
  Object.keys(sourceData).forEach((key) => {
    _formDataParams.append(
      key,
      typeof sourceData[key] === 'object' ? JSON.stringify(sourceData[key]) : sourceData[key]
    );
  });
  return _formDataParams;
}

// 获取iframe传过来的内容
export const getUserCode = () => {
  const handleListener = (e: any)=>{
    if(e?.data?.userCode) {
      localStorage.setItem('userCode', e?.data?.userCode);
    }
  }  
  useEffect(()=>{
    window.addEventListener('message', handleListener, false)
    return ()=>{
      window.removeEventListener('message', handleListener, false)
    }
  }, []);
}

// 获取url中的参数
export const getQueryString = () => {
  const url = location.href;
  const params: any = {};
  const queryString = url.split('?')[1];
  if (queryString) {
    const arr = queryString.split('&');
    arr.forEach((item: any) => {
      const [key, value] = item.split('=');
      params[key] = decodeURIComponent(value);
    });
  }
  return params;
}

// 导出Excel
export const exportExcel = (resp: any, errorMessage?: string) => {
  try {
    if (!get(resp, "data", null)) {
      message.error({
        content: errorMessage || "导出失败",
        duration: 2,
      });
      return false;
    }
    const url = new Blob([resp.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = window.URL.createObjectURL(url);
    link.download = decodeURIComponent(get(resp, "headers.filename", ""));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (e) {
    console.error(e);
  }
}

// 增加千分位
export const addThousandSeparator = (num: any) => {
  if (!num || !Number.isFinite(+num)) return num // （!num）是针对null，因为+null返回0会导致Number.isFinite(+num)返回true，发生误判
  const decimals = Number.isInteger(+num) ? '' : String(num).split('.')[1]
  const arr = String(parseInt(num)).split('').reverse()
  return `${arr
    .map((item, index) => {
      return index !== 0 && index % 3 === 0 ? item + ',' : item
    })
    .reverse()
    .join('')}${decimals && '.' + decimals}`
}

// 处理成万元&保留两位小数
export const handleTenThousand = (val: any) => {
  const num = Number(val) || 0;
  return (num / 10000).toFixed(2) || '-';
}
