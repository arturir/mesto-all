const router = require("express").Router();
const express = require("express");
const { celebrate, Joi, errors } = require("celebrate");
const NotFoundError = require("../errors/NotFoundError");
const regExpUrl = require("../regexp/url");
const regExpEmail = require("../regexp/email");

const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { requestLogger, errorLogger } = require("../middlewares/logger");
const handlerCORS = require("../middlewares/handlerCORS");

const validationBodyCreatUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(3).regex(regExpEmail),
    password: Joi.string().required().min(2),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).regex(regExpUrl),
  }),
});

const validationBodyLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(3).regex(regExpEmail),
    password: Joi.string().required().min(2),
  }),
});

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(requestLogger);
router.use(handlerCORS);
router.use("/users", auth, require("./users"));
router.use("/cards", auth, require("./cards"));

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

router.post("/signin", validationBodyLogin, login);
router.post("/signup", validationBodyCreatUser, createUser);

router.use("*", auth, () => {
  throw new NotFoundError("Страница не найдена");
});

router.use(errorLogger);

router.use(errors());
// eslint-disable-next-line
router.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? "На сервере произошла ошибка" : message });
});

module.exports = router;
