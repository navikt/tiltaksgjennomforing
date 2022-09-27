const setup = (app) => {
    app.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(process.env.DECORATOR_INTERNAL + req.originalUrl);
    });
};
export default { setup };
