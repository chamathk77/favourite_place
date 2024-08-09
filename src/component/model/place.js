class place{
    constructor({title,imageUrl,address,location}) {
        this.title = title
        this.imageUrl = imageUrl
        this.location = location
        this.address = address
        this.id=Math.random().toString()
    }
}