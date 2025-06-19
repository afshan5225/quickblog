import ImageKit from "imagekit";


var imagekit = new ImageKit({
    publicKey : process.env.IMAGE_KIT_PUB,
    privateKey : process.env.IMAGE_KIT_PRV ,
    urlEndpoint : process.env.IMAGE_KIT_END
});


export default imagekit;