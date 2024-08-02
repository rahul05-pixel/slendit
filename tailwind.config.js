/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#81A6DB",
        customGray:"#F7F8FB",
        customGray1:"#EFF2F6",
        iconColor:"#849EB7",
        customBlack:"#1D2A36",
        customButtonColor:"#EFF2F6",
        customLinkColor:"#8ED6F7",
        customBgColor:"#021746",
        customButtonColor1:"#132B63",
        customSpanColor:"#F37C62",
        customTextBoxColor:"#F7F4E3",
        customTextColor1:"#EAB03C",
        handSpackColor:"#FFD351"
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif',] ,
        'cornerstone':['Cornerstone']
      },
      
    },
  },
  plugins: [],
}
