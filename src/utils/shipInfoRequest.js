import { request } from './request'

// Common Ship

export const registerCommonShip = (token, base64, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, latitude, longitude) => 
    request.post('/Ships/ship/normal/create/', {
			image_data: base64,
			name: name,
            types: types,
            code: code,
            tons: tons,
            size: size,
            is_ais: is_ais,
            is_vpass: is_vpass,
            is_vhf: is_vhf,
            is_ff: is_ff,
            region: region,
            port: port,
            lat: latitude,
            lon: longitude,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const registerCommonShipImages = (token, id, base64) => 
    request.post('/Ships/image/normal/add/', {
        id: id,
        image_data: base64, 
    }, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const deleteCommonShip = (token, index) => 
    request.delete('/Ships/ship/normal/' + index + '/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const searchCommonShip = (token, index, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port) => 
    request.post('/Ships/ship/normal/search/?page=' + index, {
			name: name,
            types: types,
            code: code,
            tons: tons,
            size: size,
            is_ais: is_ais,
            is_vpass: is_vpass,
            is_vhf: is_vhf,
            is_ff: is_ff,
            region: region,
            port: region,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestCommonShipList = (token, index) => 
    request.get('/Ships/ship/normal/list/?page=' + index, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestCommonShipDetail = (token, id) => 
    request.get('/Ships/ship/normal/' + id, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestCommonShipGallery = (token, id) => 
    request.get('/Ships/image/normal/list/' + id, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const updateCommonShipDetail = (token, id, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port) =>
    request.post('Ships/ship/normal/' + id + '/',{
            name: name,
            types: types,
            code: code,
            tons: tons,
            size: size,
            is_ais: is_ais,
            is_vpass: is_vpass,
            is_vhf: is_vhf,
            is_ff: is_ff,
            region: region,
            port: port,
        },{
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

// Wasted Ship

export const registerWastedShip = (token, base64, types, latitude, longitude, info, region) => 
    request.post('/Ships/ship/waste/create/', {
			image_data: base64,
            types: types,
			lat: latitude,
			lon: longitude,
			info: info,
            region: region,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const registerWastedShipImages = (token, id, base64) => 
    request.post('/Ships/image/waste/add/', {
        id: id,
        image_data: base64, 
    }, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const deleteWastedShip = (token, index) => 
    request.delete('/Ships/ship/waste/' + index + '/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const searchWastedShip = (token, index, id, region, types, info) => 
    request.post('/Ships/ship/waste/search/?page=' + index, {
            id: id,
            region: region,
            types: types,
            info: info,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestWastedShipList = (token, index) => 
    request.get('/Ships/ship/waste/list/?page=' + index, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestWastedShipDetail = (token, id) => 
    request.get('/Ships/ship/waste/' + id, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestWastedShipGallery = (token, id) => 
    request.get('/Ships/image/waste/list/' + id, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const updateWastedShipDetail = (token, id, info, latitude, longitude, types, region, port) =>
    request.post('Ships/ship/waste/' + id + '/',{
            info: info,
            lat: latitude,
            lon: longitude,
            types: types,
            region: region,
        },{
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})
// AI

export const requestAIResult = (token, base64) => 
    request.post('/Ships/predict/', {
			image_data: base64,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

// MAP
export const requestShipLocation = (token) =>
    request.get('Ships/ship/location', {
    headers: {
        'AUTHORIZATION': 'jwt ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
}})

