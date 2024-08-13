 export const GOOGLE_MAPS_API_KEY= "AIzaSyBXN-ldzKjT5IFcN7sWcMJbEyhi9B1NK1w"


export function getMapPreviewUrl(lat: number, lng: number) {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=400x200&maptype=roadmap
    &markers=color:red%7Clabel:A%7C${lat},${lng}
    &key=${GOOGLE_MAPS_API_KEY}`

    return imagePreviewUrl
}