const express = require("express");
const router = express.Router();
const {
    postPosts,
    getPosts,
    updatePosts,
    deletePosts
    } = require("../controller/postController");
    
// 조회를 제외한 API는 헤더에 토큰 추가 예정

router.route("/")
    .post(postPosts)
    .get(getPosts)
    .put(updatePosts)
    .delete(deletePosts);

module.exports = router;