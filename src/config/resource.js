
export const BIND_WECHAT_TAIDII = `/jwt-token-auth/`// 登录
export const GET_OPENID = `/api/wechat/openid/` // 获取openid
export const LOGIN_WECHAT = `/jwt-token-auth-wechat/` // openid登录
export const FETCH_ASSESSMENT_LIST = `/api/student/{studentId}/assessment_subjects/` // 获取评估列表
export const FETCH_ASSESSMENT = `/api/student/{studentId}/view_assessment_subject/` // 获取评估内容
export const FETCH_ATTENDANCE = `/api/student/{studentId}/attendance_day/` // 获取出勤数据
export const FETCH_WEEKLY_UPDATE = `/api/student/{studentId}/weeklyupdate/` // 获取每周更新

export const FETCH_SURVEY_LIST = `/api/student/{studentId}/surveys/` // 获取调查问卷列表
export const FETCH_SURVEY = `/api/student/{studentId}/view_survey/` // 获取问卷详情
export const SAVE_SURVEY = `/api/student/{studentId}/save_survey/` // 保存问卷

export const FETCH_PROFILE = `/api/guardian/profile/{id}/` // 获取个人信息
export const FETCH_QRCODE = `/api/attendance/qrcode/` // 获取二维码

export const FETCH_ACTIVITY_LIST = `/api/infanttracking/activity/listactivity/` // 获取活动列表
export const FETCH_ACTIVITY_LIST_V2 = `/api/student/{studentId}/moments_video/`

export const FETCH_NEWS_LIST = `/api/parentcommunication/{studentId}/announcement/` // 获取最新消息

export const FETCH_CHAT_HISTORY = `/api/student/{studentId}/commbookv2/` // 接收
export const SAVE_CHAT = `/api/commbookv2/` // 发送消息
