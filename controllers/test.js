exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "this is my first post",
        imageUrl: "images/linkedin-svgrepo-com.svg",
        creator: {
          name: "Ali",
        },
        createdAt: new Date(),
      },
    ],
  });
};
