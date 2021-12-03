import { request } from './request'

// Common Ship

export const registerCommonShip = (token, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, latitude, longitude) => 
    request.post('/Ships/ship/normal/create/', {
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

export const registerCommonShipImages = (token, formdata) => 
    request.post('/Ships/image/normal/', formdata, {
            headers: {
                'AUTHORIZATION': 'jwt ' + token,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
}})

export const deleteCommonShip = (token, index) => 
    request.delete('/Ships/ship/normal/' + index + '/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const deleteCommonShipImage = (token, id) => 
    request.delete('/Ships/image/normal/?id=' + id, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const searchCommonShip = (token, index, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port, sort, unit) => 
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
            port: port,
            tag: sort,
            unit: unit,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestCommonShipList = (token, index, sort, unit) => 
    request.get('/Ships/ship/normal/list/?page=' + index + '&tag=' + sort + '&unit=' + unit, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestCommonShipDetail = (token, id) => 
    request.get('/Ships/ship/normal/' + id + '/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestCommonShipGallery = (token, id) => 
    request.get('/Ships/image/normal/list/' + id + '/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const updateCommonShipDetail = (token, id, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port) =>
    request.post('/Ships/ship/normal/' + id + '/',{
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

export const updateCommonShipMImage = (token, id) =>
    request.post('/Ships/image/change/normal/',{
            id: id,
        },{
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

// Wasted Ship

export const registerWastedShip = (token, types, latitude, longitude, info, region) => 
    request.post('/Ships/ship/waste/create/', {
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

export const registerWastedShipImages = (token, formdata) => 
    request.post('/Ships/image/waste/', formdata, {
            headers: {
                'AUTHORIZATION': 'jwt ' + token,
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
}})

export const deleteWastedShip = (token, index) => 
    request.delete('/Ships/ship/waste/' + index + '/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const deleteWastedShipImage = (token, id) => 
    request.delete('/Ships/image/waste/?id=' + id, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const searchWastedShip = (token, index, id, region, types, info, sort, unit) => 
    request.post('/Ships/ship/waste/search/?page=' + index, {
            id: id,
            region: region,
            types: types,
            info: info,
            tag: sort,
            unit: unit,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestWastedShipList = (token, index, sort, unit) => 
    request.get('/Ships/ship/waste/list/?page=' + index + '&tag=' + sort + '&unit=' + unit, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestWastedShipDetail = (token, id) => 
    request.get('/Ships/ship/waste/' + id + '/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestWastedShipGallery = (token, id) => 
    request.get('/Ships/image/waste/list/' + id + '/', {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const updateWastedShipDetail = (token, id, info, latitude, longitude, types, region) =>
    request.post('/Ships/ship/waste/' + id + '/',{
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

export const updateWastedShipMImage = (token, id) =>
    request.post('/Ships/image/change/waste/',{
            id: id,
        },{
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

// AI

export const requestAIResult = (token, formdata) => 
    request.post('/Ships/predict/', formdata, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
}})

// MAP

export const requestCommonShipLocation = (token) =>
    request.get('/Ships/ship/normal/location/', {
    headers: {
        'AUTHORIZATION': 'jwt ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
}})

export const requestCommonShipLocationDetail = (token, latitude, longitude) =>
    request.post('/Ships/ship/normal/location/',{
        lat: latitude,
        lon: longitude,
    }, {
    headers: {
        'AUTHORIZATION': 'jwt ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
}})

export const requestCommonShipLocationUnit = (token, unit) => {
    return (
        request.get('/Ships/ship/normal/location/' + `?unit=${unit}`, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    }})
    )
}

export const requestWastedShipLocation = (token) =>
    request.get('/Ships/ship/waste/location/', {
    headers: {
        'AUTHORIZATION': 'jwt ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
}})

export const requestWastedShipLocationDetail = (token, latitude, longitude) =>
    request.post('/Ships/ship/waste/location/',{
        lat: latitude,
        lon: longitude,
    }, {
    headers: {
        'AUTHORIZATION': 'jwt ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
}})

// ShipOwner

export const requestShipOwner = (token, id) =>
    request.get('/Ships/owner/' + id + '/',{
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const registerShipOwner = (token, formdata) =>
    request.post('/Ships/owner/create/', formdata,{
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
}})

export const requestTrainImage = (token, ship_id, img_data) => 
    request.post('/Ships/image/train/', {
        ship_id: ship_id,
        img_data: img_data
    },{
        headers: {
            "AUTHORIZATION": "jwt " + token,
            "Content-Type": "application/json",
            "Accept": "application/json",
}})