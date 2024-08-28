export class place{
    constructor(title,imageUrl,location) {
 
        // console.log("location 777" ,location)
        // console.log("imageUrl 777", imageUrl)
        // console.log("title 777", title)

        this.title = title
        this.imageUrl = imageUrl
        this.location =  {lat:location.location.lat,lng:location.location.lng}
        this.address = location.address
        this.id=Math.random().toString()
    }
}