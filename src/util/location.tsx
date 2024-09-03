 // export const GOOGLE_MAPS_API_KEY= "AIzaSyBXN-ldzKjT5IFcN7sWcMJbEyhi9B1NK1w"


export function getMapPreviewUrl(lat: number, lng: number) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:A%7C${lat},${lng}
    &key=${GOOGLE_MAPS_API_KEY}`

    return imagePreviewUrl
}

export async function get_address(lat: number, lng: number) {

    try {

        console.log("lat,lng----------->>>>>>>>>>>>>>>>>>",lat,lng)
        const url='https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+GOOGLE_MAPS_API_KEY
        const response=await fetch(url)
        console.log("-------------------->>>>>>>>>>>>>>>>>",response)

        const data=await response.json()
        const address=data.results[0].formatted_address
        console.log("address----------->>>>>>>>>>>>>>>>>>",address)

        return address
    
    } catch (error) {
        console.log("error----------->>>>>>>>>>>>>>>>>>",error)
        
    }



  
}
