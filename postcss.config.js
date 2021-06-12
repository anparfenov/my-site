module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-nested": {},
    "postcss-custom-media": {},
    "autoprefixer": {},
    "postcss-hash": {
        algorithm: "sha256",
        trim: 10,
        manifest: "./_data/css.json"
    },
  },
};
