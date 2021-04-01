import { request } from './request'

export const requestNoticeList = (token) => 
    request.get('/Posts/notice/list/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestNotice = (token, index) => 
    request.get('/Posts/notice/' + index, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestQuestionList = (token) => 
    request.get('/Posts/question/list/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestQuestion = (token, index) => 
    request.get('/Posts/question/' + index, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})
export const registerQuestion = (token, title, content) => 
    request.post('/Posts/question/create/', {
        title: title,
        content: content,
    },{
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestAnswer = (token, index) => 
    request.get('/Posts/answer/' + index, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestVersion = () => 
	request.get('/Accounts/status/',{
})