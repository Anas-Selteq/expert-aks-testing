import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #F8FAFC  !important;
    color: hsl(192, 100%, 9%);
    font-family: 'Roboto', sans-serif;
    font-size: 1.15em;
    margin: 0 !important;
    padding: 0 !important;
   overflow-x: hidden !important;
   height: 100vh;
  }

  ///////////////////////Anas///////////////
  .form_search_new
  {
    box-shadow: none !important;
    outline: none !important;
  }
  .form_search_new:focus
  {
    box-shadow: none !important;
    outline: none !important;
    border: 1px solid red !important; 
  }
  .new_label_head
  {
    color: #141414;
    font-size: 16px;
    font-weight: 600;
    font-family: Poppins;
  }
  .default_label_address
  {
    color: #000000;
    font-size: 12px;
    font-weight: 400;
    font-family: Roboto;
  }
  .universal_new_red
  {
    background-color: #E90000 !important;
    border-radius: 8px !important;
  }
  .padding_top_new_summary
  {
    padding-top: 2px;
  }
  .padding_lef_r_summary
  {
    padding-left: 12px;
    padding-right: 12px;
  }
  .padding_bottom_new_bottom
  {
    padding-bottom: 2px;
  }
  .address_new
  {
    color: #9D9D9D;
    font-size: 13px;
    font-weight: 400;
    font-family: Poppins;
  }
  .new_font_address
  {
    color: #000000;
    font-size: 14px;
    font-weight: 600;
    font-family: Poppins;
  }
  .font_new_header
  {
    color: #444444;
    font-size: 12px;
    font-weight: 500;
    font-family: Poppins;
  }
  .font_new_header2
  {
    color: #AAAAAA;
    font-size: 10px;
    font-weight: 400;
    font-family: Poppins;
  }
  .account_font
  {
    color: #4A4A4A;
    font-size: 12px;
    font-weight: 400;
    font-family: Poppins;
  }
  /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////chat////////////////////////////////



  ///////////////////////////////////////////////////////////RABIA///////////////////////////////////////////////////

  .react-multi-carousel-track li 
  {
    border-radius: 13px !important;
    object-fit: cover;
    height: 282px;
  }
  .fa-ellipsis-v{
    font-size: 12px;
    color: #A1A1A1 !important;
  }
  .border_remove_input::placeholder{
    font-weight: 400;
    font-size: 12px;
    font-family: Poppins;
  }
  .fa-paperclip{
    color: #A1A1A1;
    font-weight: 600;
    font-size: 15px;
  }
  .offers_price2{
    margin-top: -12px;
  }
  .offers_price{
    margin-top: -12px;
  }
 .booking_detail_img{
    height: 50px;
    width: 50px;
  }
  .order_img{
    height: 60px;
    width: 60px;
  }
  .booking_img{
    height: 40px;
    width: 40px;
  }

  .font_color_add_new
  {
    color: #316EE4;
    font-size: 14px;
    font-weight: 400;
    font-family: Poppins;

  }
  .new_quantity_screen
  {
    color: #777777;
    font-size: 14px;
    font-weight: 400;
    font-family: Poppins;
  }
  .dropdown_setting_quantity
  {
    background-color: #DBDBDB4D;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .des_font
  {
    color: #484848;
  font-size: 12px;
  font-weight: 400;
  font-family: Poppins;
  }
 .font_contentpage
 {
  color: #F80000;
  font-size: 28px;
  font-weight: 400;
  font-family: Poppins;
 }
 .font_only_c
 {
  color: #F80000;
  font-size: 20px;
  font-weight: 400;
  font-family: Roboto;
 }
 .heading1_contentpage {
  color: #FFFFFF;
  font-size: 34px;
  font-weight: 600;
  font-family: Poppins;
}
.using_flex_contentpage
{
  display: flex;
  flex-direction: row;
  justify-content: left;
}
.margine_left_new
{
  margin-left: 630px;
}
.text_speak
{
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 500;
  font-family: Poppins;
}
.heading2_contentpage
{
  color: #FFFFFF;
  font-size: 28px;
  font-weight: 400;
  font-family: Poppins;
}
 .amount_c
 {
  color: #F80000;
  font-size: 32px;
  font-weight: 600;
  font-family: Roboto;
 }
 .amount_c_pound
 {
  color: #F80000;
  font-size: 22px;
  font-weight: 400;
  font-family: Roboto;
 }
 .background_white_light
 {
  background-color: #FBFBFB70 !important;
  border: 1px solid #FBFBFB70 !important; 
 }
 .heading_exp_c
 {
  color: #656565;
  font-size: 16px;
  font-weight: 400;
  font-family: Roboto;
 }
 .background_color_button_c
 {
  background-color: #DC0000 !important;
  font-size: 20px;
 }
 .or_color_size
 {
  color: #373737;
  font-weight: 400;
  font-size: 18px;
 }
  .background_active
  {
    background-color: #F0F9FF !important;
  }
  .spread_icon_color
  {
    color: #CECECE;
    
  }
  .universal_button_color2
  {
    background-color: #D10000 !important;
    color: #FFFFFF;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1%;
    border-radius: 8px !important;
  }
  .notifications_lising_header
  {
    color: #262626;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1%;
  }
  .min_ago_notifications
  {
    color: #7B7B7B;
    font-family: Roboto;
    font-size: 8px;
    font-weight: 400;
    letter-spacing: 1%;
  }
  .desc_notifications
  {
    color: #929292;
    font-family: Roboto;
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 1%; 
  }
  .line_notifications
  {
    color: #F5F5F5;
    border: 0.8px solid #F5F5F5;
    background-color: #F5F5F5;
  }
  .new_notifications_font
  {
    color: #262626;
    font-family: Roboto;
    font-size: 18px;
    font-weight: 900;
  }
  .font_notifictions_sub_para
  {
    color: ##262626;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1%;
    color: #ACACAC;
<<<<<<< HEAD
=======
  }
>>>>>>> aea19364eec5095a52e4ad440ba2cbe985fc1130
  .allser_text{
    padding-right: 10%;
  }
  .allser_text2{
    padding-left: 10%;
  
  }
  .off_button{
    background-color: #F0F0F0 !important;
    border: 1px solid  #F0F0F0 !important;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .from_text{
    color: #9D9D9D;
    font-family: Poppins;
    font-size: 12px !important;
    font-style: normal;
    font-weight: 400;
  }
  .fav_icon_fy{
    height: 33.45px;
    width: 33.45px;
    margin-top: -85px;
    margin-left: 10px;
    position: relative;
    z-index: 1000;
  }
  .fav_icon_offer{
    height: 33.45px;
    width: 33.45px;
    margin-top: -82px;
    margin-left: 8px;
    position: relative;
    z-index: 100;
  }
  .fav_icon_allser{
    height: 33.45px;
    width: 33.45px;
    margin-left: 23px;
    margin-top: 30px;
  }
  .offers_img{
    height: 200px !important;
    width: 300px !important;
    object-fit: cover;
    border-radius: 13px;
    max-width: none !important; 
  }
  .font_one_p1
  {
    color: #6C6C6C;
    font-family: Roboto;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
  }
  .paddng_left_right_set
  {
    padding-left: 12px;
    padding-right: 12px;
  }
  .font_below_service
  {
    color: #AEAEAE;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .font_below_service_duration
  {
    color: #BBB;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;

  }
  .button_size_set
  {
    height: 35px;
    width: 65px;
    border: 1px solid #7F7F7F !important;
    border-radius: 7px !important;
  }
  .button_size_set_active
  {
    border: 1px solid #7F7F7F !important;
    border-radius: 7px !important;
    background-color: red !important;
  }
  .booknow_button_session
  {
    height: 35px;
    width: 65px;
    border-radius: 7px !important;
    border: 1px solid #E90000 !important; 
  }
  .background_content_sec4
  {
    background-image: url(/imagess/bg-contact.png);
    background-position: 100% 100%;
    background-size: cover;
    background-repeat: no-repeat;
    height: 70vh;
  }
  .booknow_button_session:hover
  { 
    height: 35px;
    width: 65px;
    background-color: white !important;
    border-radius: 7px !important;
    border: 1px solid #E90000 !important; 
  }
  .display_flex_booking_detail
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .with_detail_card
  {
    border-radius: 10px;
    border: 0.5px solid #DCDCDC;
    background: #FFF;
    width: 100px;
    height: 100px;
    box-shadow:
  0 2.8px 2.2px rgba(162, 162, 162, 0.080),
  0 6.7px 5.3px rgba(162, 162, 162, 0.080),
  0 12.5px 10px rgba(162, 162, 162, 0.080),
  0 22.3px 17.9px rgba(162, 162, 162, 0.080),
  0 41.8px 33.4px rgba(162, 162, 162, 0.080),
  0 100px 80px rgba(162, 162, 162, 0.080)
  }
  .iconsheightwidth
  {
    width: 6px;
    height: 10px;
    color: #7B7B7B;
  }
  .border_right_new
  {
    border-right: 0.8px solid #CECECE;
  }
  .border_left_new_one
  {
    border-left: 0.8px solid #CECECE;
  }
  .width_card
  {
    width: 300px !important;
  }
  .font_discounted
  {
    color: #9D9D9D;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    text-decoration: line-through;
  }
  .label_line
  {
    color: #AAA;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .background_of_adress:hover
  {
    background-color: #FDE5E5 !important;
    color: #A4A4A4;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .background_of_adress
  {
    color: #A4A4A4;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .cookies_modalnew
{
  text-decoration: none;
  color: white;
}
  .cookies_modal
  {
    position: fixed;
    z-index: 10000000000;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    background-color: rgb(53, 53, 53);
    color: white !important;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .expert_center_text
  {
    color: #7B7B7B;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .font_completed
  {
    color: #15BC6C;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .background_border
  {
    border-radius: 10px;
    border: 0.5px solid #DCDCDC;
    background: #FFF;
    width: 100%;
    height: 100px;
  }
  .chat_text
  {
    color: #8A8A8A;
    font-family Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
  }
  .slots_color
  {
    color: #383838;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .slots_color_active
  {
    color: white;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .font_value_main
  {
    color: #4A4949;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }


  .border_active_attribute
  {
    border-radius: 8px;
    border: 0.8px solid #EC1E27;
  }
  .outline_t1
  {
    color: #171717;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .outline_t2
  {
    color: #636262;
    font-family: Poppins;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
  }
  .main_waxflow_text12
  {
    color: #808080;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
  .main_waxflow_text_new
  {
    color: #000;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  .shadow_new_one
  {
    background-color: #FFFFFF;
    box-shadow: 0 0 20px rgba(211, 211, 211, 0.485); 
    border-radius: 8px;
  }
  .img_txt_width
  {
    width: 30px;
  }
  .notes_txt
  {
    color: #000;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
  .new_notes_new
  {
    color: #8D8D8D;
    font-family: Poppins;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
  }
  .badge_bg_light
  {
    background-color: #F0F0F0 !important;
    color: #141414 !important;
    font-family: Poppins;
    font-size: 8px !important;
    font-style: normal;
    font-weight: 400 !important;
  }
  .from_text
  {
    color: #B1B4B7;
    font-family: Poppins;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
  }
  .text_line_thright
  {
    color: #B1B4B7;
    font-family: Poppins;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    text-decoration: line-through;
  }
  .service_choose
  {
    color: #484848;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .button_light_red_around
  {
    border-radius: 8px;
    border: 0.8px solid rgba(220, 0, 0, 0.10) !important;
    background: #FFF !important; 
    color: #A29F9F !important;
    font-family: Poppins !important;
    font-size: 14px !important;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

  }
  .background_detail_bookings
  {
    background-color: white;
    border-radius: 8px;
    border: 0.5px solid #DCDCDC;
  }
  .new_detail_heading
  {
    color: #1B1B1B;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
  .new_detail_heading1
  {
    color: #1B1B1B;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  .new_light_detail
  {
    color: #BDBBBB;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .progress_new
  {
    color: #FF9B05;
    text-align: right;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .progress_new_price
  {
    color: #000;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
  .main_waxflow_text
  {
    color: #444;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  .main_waxflow_text1
  {
    color: #AAA;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .main_waxflow_text2
  {
    color: #808080;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .selected_address
  {
    white-space: nowrap; 
    width: 200px; 
    overflow: hidden;
    text-overflow: ellipsis; 
  }
  .V_new_active
  {
    color: #00AA3A;
    text-align: right;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .width_button_radeem
  {
    width: 40%;
  }
  .V_new_p
  {
    color: #000;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  .V_new_sub_text
  {
    color: #404040;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .V_new
  {
    color: #1B1B1B;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
  .V_new_sub
  {
    color: #AAA;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .display_flex_direction
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap ;
  }
  .price_range
  {
    color: #E81919;
    text-align: right;
    font-family: Roboto;
    font-size: 38px;
    font-style: normal;
    font-weight: 700;
  }
  .price_range_sub
  {
    color: #E81919;
    text-align: right;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
  .text-right-margin-p
  {
    padding-right: 30%;
  }
  .newborder_code
  {
    border-radius: 42px;
    border: 0.75px solid #DEE2E6;
    background: #FFF;
    box-shadow: 0px 7px 9px 0px rgba(0, 0, 0, 0.06);
  }
  .border_left_new1
  {
    border-left: 2px solid black;
  }
  #icons_link
  {
    font-size: 20px;
  }
  .copy_link
  {
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
  }
  .newpadding_main
  {
    padding-top: 7%;
    padding-bottom: 7%;
  }
  .paddin_top_input
  {
    padding-top: 10%;
  }
  .bg_referral_img
  {
    background-image: url(/imagess/bgref.png);
    background-position: 100% 100%;
    background-size: cover;
    background-repeat: no-repeat;
    
  } 
  
  .text_head_ref
  {
    color: #FFF;
    font-family: Roboto;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
  }
  .sub_heading_new
  {
    color: #FFF;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .padding_left_new_referral
  {
    padding-left: 15%;
  }
  .height_adjust
  {
    height: 60vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .height_adjust::-webkit-scrollbar
  {
   display:none;
  }
  .border_white_new
  {
    border-radius: 8px;
    border: 0.5px solid #DCDCDC;
    background: #FFF;
  }
  .heading_chat
  {
    color: #1B1B1B;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
  .sub_text_chat
  {
    color: #868686;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .sub_text_chat_1
  {
    color: #9B9B9B;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .background_color_button_chat
  {
    border: 1px solid #F5F6FA !important;
    background: #F5F6FA !important;
    color: #B3B7C6 !important;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .margin_neg_chat
  {
    margin-top: -18px;
    margin-left: 28px;
  }
  .margin_neg_chat_new
  {
    margin-top: -18px;
  }
  .main_head_chat
  {
    color: #000;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .background_text_chat
  {
    border-radius: 0px 20px 20px 20px;
    background: #F5F6FA;
  }
  .background_text_chat_sender
  {
    border-radius: 20px 0px 20px 20px;
    background: rgba(233, 0, 0, 0.10);
  }
  .text_chat
  {
    border-radius: 10px;
    background: #F5F6FA;
    color: #2B2B2B;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .text_chatnew
  {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right: 0px solid white;
    background: #F5F6FA;
    color: #2B2B2B;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    outline: none;
    box-shadow: none;
  }
  .text_chatnew:focus
  {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right: 0px solid white;
    background: #F5F6FA;
    color: #2B2B2B;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    outline: none !important;
    box-shadow: none;
  }
  .text_chatnew:hover
  {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-right: 0px solid white;
    background: #F5F6FA;
    color: #2B2B2B;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    outline: none;
    box-shadow: none;
  }
  .text_chatnww
  {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-left: 0px solid white;
    background: #F5F6FA;
    color: #2B2B2B;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .unseen_text
  {
    color: #B5B5B5;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .seen_text
  {
    color: #E90000;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .new_overflow_referral
  {
    overflow-x: hidden;
  }
  .new_input-referral
  {
    color: #8F8F8F;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
  .new_steps_reward
  {
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
  }
  .left_right_padding_ref
  {
    padding-left: 20%;
    padding-right: 20%;
  }
  .send_code
  {
    color: #000;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
  .send_subcode
  {
    color: #797979;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
  .border_background_new_color
  {
    border-radius: 15px;
    border: 0.6px solid #F0F0F0;
    background: #FFF;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.05);
  }
  .new_wow_text
  {
    color: #E50202;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
  .referral_text
  {
    color: #656565;
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
  }
  .referral_text_values
  {
    color: #000;
    text-align: right;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
  .people_offered
  {
    color: #757575;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  .people_offered_red
  {
    color: #E90000;
    text-align: right;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .name_font
  {
    color: #000;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .name_font_sub
  {
    color: #AAA;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .background_remender
  {
    background-color: #FF4343 !important;
  }
  .time_avt
  {
    color: #817F7F;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .earned_new
  {
    color: #E81919;
    text-align: right;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .earned_price_r
  {
    color: #E81919;
    text-align: right;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  .background_remender_secondary
  {
    background-color: #EFEFEF !important;
    border: 1px solid #EFEFEF !important;
    color: #999 !important;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .manage_v_text
  {
    color: #000;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
  .sub_manage_v_text
  {
    color: #424242;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .white_bg_new
  {
    border-radius: 8px;
    border: 0.5px solid #DCDCDC;
    background: #FFF;
  }
.background_table_header
{
  background: #F6F6F6 !important;
}
.text_light_new
{
  color: #000;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
.table_body_text
{
  color: #8B8B8B;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
.depositee_wallet
{
  color: #396FBF;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
}
.not_depositee_wallet
{
  color: #DB0406;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
}
  .white_bg_new_o
  {
    overflow: hidden;
    border-radius: 8px;
    border: 0.5px solid #DCDCDC;
    background: #FFF;
  }
  .added_text
  {
    color: #141414;
    text-align: center;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
  }
  .text_success_wallet
  {
    color: #A5A5A5;
    text-align: center;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  @media only screen and (max-width: 850px) {
    .using_flex_contentpage
{
  display: flex;
  flex-direction: row;
  justify-content: center;
}
    .margine_left_new
    {
      justify-content: center;
      margin-left: auto;
    }
    .padding_left_new_referral
  {
    padding-left: 7%;
    padding-right: 7%;
  }
  .bg_referral_img
  {
    background-image: url(/imagess/bgref.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    
  } 
  .text-right-margin-p
  {
    padding-right: 0%;
    padding-left: 4%
  }
  .left_right_padding_ref
  {
    padding-left: 5%;
    padding-right: 5%;
  }
  }
  ///////////////////////chat-end//////////////////////////////
  .height_fiz_chat
  {
    height: 60vh;
    overflow-y: auto;
  }
  .height_fiz_chat::-webkit-scrollbar {
    display: none;
    }
  .button_design_new
  {
    border-radius: 8px !important;
    background-color: #DC0000 !important;
    border: 1px solid rgba(220, 0, 0, 0.10);
    color: white;
    font-size: 14px !important;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .button_design_new:hover
  {
    border-radius: 8px !important;
    background-color: #DC0000 !important;
    border: 1px solid rgba(220, 0, 0, 0.10);
    font-size: 14px !important;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .service_a_p
  {
    color: #424242;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
  .service_a_p1
  {
    color: #AAA;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .border_for_boxes
  {
    border-radius: 8px;
    border: 0.4px solid #DCDCDC;
    background: #FFF;
  }
  .css-ahj2mt-MuiTypography-root
  {
    color: #000;
    font-family: Roboto;
    font-size: 14px !important;
    font-style: normal;
  }
  .euro_attributes
  {
    color: #000;
    text-align: right;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;

  }
  .border_whole
  {
    border: 1px solid lightgray !important;
    background-color: lightgray !important;
  }
  .background_color_white_border
  {
    border-radius: 8px;
    border: 0.5px solid #DCDCDC;
    background: #FFF;
  }
  .background_color_white_border_active
  {
    border-radius: 8px;
    border: 0.5px solid #DCDCDC;
    background: #FFF;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
  }
  .quantity_heading
  {
    color: #1B1B1B;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
  .quantity_sub_heading
  {
    color: #7B7B7B;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .quantity_min_heading
  {
    color: #808080;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .border_bottom_quantity
  {
    border-bottom: 1px solid #ECECEC;
  }
  
  .quantity_select_1
  {
    color: #989898;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .quantity_p
  {
    color: #999;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .price_p
  {
    color: #999;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .quantity_p_active
  {
    color: black;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .price_p_active
  {
    color: black;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .width_h_set
  {
    width: 60px;
    height: 58.8px;
  }
  .custom_text
  {
    color: #000;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .variable_p
  {
    color: #424242;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .newq1_text
  {
    color: #AAA;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .newq2_text
  {
    color: #424242;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  .header1_expert
  {
  color: #FFF;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  }
  .input_left_tendon1
  {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: none;
    border-bottom-right-radius: none;
    outline: none;
    box-shadow: none;
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border-left: 1px solid white;
    border-right: none;
  }
  .input_left_tendon1:focus
  {
    border: 1px solid white;
    outline: none;
    box-shadow: none;
  }
  .input_left_tendon1::placeholder
  {
    color: #9A9A9A;
    border: 1px solid white;
    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .dropdown_size1
  {
    width: 100% !important;
    height: 445px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .dropdown_sizeless
  {
    width: 100% !important;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .dropdown_size1::-webkit-scrollbar {
    display: none;
    }
  #countrydrop111
  {
    width: 100%;
  }
  .body_color_payment
  {
    background: #FBFCFF;
  }
  .button_apply_new_order_summary
  {
    border-radius: 10px !important;
    background: #EC1E27 !important;
    width: 35%;
  }
  .font_checkbox
  {
    color: #000;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .model_height_notes
  {
    height: 80vh !important;
  }
  .position_input_notes
  {
    position: absolute;
    z-index: 100;
    bottom: 20px;
    left: 0;
    width: 100%;
  }
  .padding_notes_input
  {
    padding-left: 15px;
    padding-right: 15px;
  }
  .time_font
  {
    color: #909090;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .time_font1
  {
    color: #E90000;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .button_style_addnew
  {
    background-color: white !important;
    color: #C2C2C2 !important;
    border-radius: 8px !important;
border: 1px solid #E90000 !important;
  }
  .reward_red
  {
    color:red;
  }
  .background_card_new
  {
    background-color: #FBFCFF;
    border: 0.4px solid #DCDCDC;
    border-radius: 8px;
  }
  .text_notes
  {
    color: #4A4A4A;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .text_name
  {
    color: #6C6C6C;
    font-family: Roboto;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
  }
  .notes_para
  {
    color: #424242;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .notes_para1
  {
    color: #E90000;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .reward_small
  {
    Enter Email or ID
    color: #7D7D7D;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .sub_total_text1
  {
    color: #6C6C6C;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .sub_total_text2
  {
    color: #888;
    text-align: right;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .sub_total_text3
  {
    color: #A0A0A0;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .sub_total_text4
  {
    color: #03BC7A;
    text-align: right;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .sub_total_text5
  {
    color: #A0A0A0;
    text-align: right;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400; 
  }
  .sub_total_text6
  {
    color: #000;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
  }
  .relevent_notes
  {
    color: #191919;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .label_summary
  {
    color: #AAA;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .background_address_bar
  {
    border-radius: 8px;
    border: 0.4px solid #DCDCDC;
    background: #FFF;
  }
  .background_address_bar_active
  {
    border-radius: 8px;
    border: 0.8px solid #EC1E27;
    background: #FFF;
  }
  .background_address_bar_active_new
  {
    
    background: white;
    border-radius: 5px;
    border: 0.5px solid #E90000;


  }
  .head_text_address
  {
    color: #1B1B1B;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
  }
  .img_hei_width
  {
    width: 20px;
    height: 20px;
  }
  .choose_address_text
  {
    color: #424242;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .selected_address
  {
    color: #424242;

    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .prefered_heading_business
  {
    color: #424242;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .apponit
  {
    color: #9B9B9B;
    font-family: Roboto;
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
  }
  .apponit11
  {
    color: #9B9B9B;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
  }
  .btn_default_design
  {
    border-radius: 8px;
    background-color: lightgray !important;
    border: 1px solid #EFEFEF !important;
    color: #101010 !important;
    font-family: Roboto;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
  }
  .address_tect_font
  {
    color: #000;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .vouchers_unselected
  {
    color: #A9A9A9;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .vouchers_unselected14
  {
    color: #A9A9A9;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
  }
  .vouchers_active
  {
    color: #DB0406;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    border-bottom: 2px solid #DB0406; 
  }
  .vouchers_active14
  {
    color: #DB0406;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    border-bottom: 2px solid #DB0406; 
  }
  .border_card_v
  {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 0.8px solid #DCDCDC;
    background: #FFF;
  }
  .exp_date
  {
    color: #6C6C6C;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .flag
  {
    margin-top: -2px !important;
  }
  .input_discount
  {
    border: 0px solid white;
    outline: none;
    box-shadow: none;
    padding: 0px 0px !important;
  }
  .input_discount:hover
  {
    border: 0px solid white;
    outline: none;
    box-shadow: none;
  }
  .input_discount:focus
  {
    border: 0px solid white;
    outline: none;
    box-shadow: none;
  }
  .input_discount::placeholder
  {
    color: #888;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;
  }
  .sub_total_texttotal
  {
    color: #000;

font-family: Roboto;
font-size: 16px;
font-style: normal;
font-weight: 600;
  }
  .sub_total_textprice
  {
    color: #000;

text-align: right;
font-family: Roboto;
font-size: 24px;
font-style: normal;
font-weight: 600;
  }
  .border_color_background 
  {
    border-radius: 8px;
    border: 0.5px solid #DCDCDC;
    background-color: #FFFFFF !important;
    cursor: pointer;
  }
  .border_bottom_new
  {
    border-bottom: 0.5px solid #DCDCDC;
  }
  .color_summary_text
  {
    color: #000;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  }
  .sub_total_text
  {
    color: #6C6C6C;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;
  }
  .sub_total_textbig
  {
    color: #545454;

text-align: right;
font-family: Roboto;
font-size: 18px;
font-style: normal;
font-weight: 600;
  }
  .sub_total_texttax
  {
    color: #6C6C6C;

font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
  }
  .img_align_end
  {
    text-align: right;
  }
  .img_align_center
  {
    text-align: center;
  }
  .img_align_start
  {
    text-align: start;
  }
  .border_right_line
  {
    border-right: 1px solid lightgray;
  }

  .universal_button_color 
  {
    border-radius: 10px !important;
    background: #EC1E27 !important;

  }
  .skleton_landing
  {
    width: 55px !important;
    height: 55px !important;
    margin-left: 30% !important;
  }
  .skleton_landing_typ
  {
    width: 40% !important;
    margin-left: 25% !important;
    margin-top: 5px !important;
  }
  #icon_universal{
    color: gray;
  }
  .flex_for_notes
  {
    display: flex;
    justify-content: flex-end;
  }
  .dropstart .dropdown-toggle::before
  {
   display: none;
  }
  .setting_break
  {
    width: 15%;
    border-radius: 8px;
    border: 1px solid lightgray;
    overflow: hidden;
  }
  .text-appear {
    opacity: 0;
  }
  #myInput
  {
    font-size: 13px;
    color: gray;
  }
  
  .text-appear-active {
    opacity: 1;
    transition: opacity 1s ease-in;
  }
  .input_search_voice
  {
    border-radius: 6px;
    background: white;
    box-shadow: 0px 13px 12px 0px rgba(113, 0, 0, 0.42);
  }
  .img_flag_width_height
  {
    width: 15px;
    height: 15px;
  }
  .border_listt_countries
  {
    filter: drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.16));
    border-radius: 4px;
    border: 1px solid #EAEAEA;
    background: #FFF;
  }
  .radius_selection
  {
    border-radius: 4px;
  border: 1px solid #EAEAEA;
  background: #FFF;
  }
  .time_tag
  {
    color: #7B7B7B;
font-family: Roboto;
font-size: 8px;
font-style: normal;
font-weight: 400;
  }
  .new_profile
  {
    border-radius: 4px;
border: 1px solid #EDEDED;

background: #F1F3F4;
  }
  .innertext
  {
  color: #000;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  }
  .innertext1
  {
    color: #888;

font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
  }
  .countrytext
  {
    color: #7E7E7E;

font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
  }
  .countrytext1
  {
    color: #FFF;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    border-radius: 8px;
background: #D10000 !important;
  }
  #new_drop
{
  width: 95vw !important;
  margin-left: 20px;
  margin-top: 20px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 20px;
  height: 57vh;
  border-radius: 6px;
  border: 1px solid #B8B8B8;
  background: #F7F8FA;
  box-shadow: 0px 4px 19px 0px rgba(0, 0, 0, 0.10);
}
#new_drop1
{
  width: 217px !important;
  margin-left: 20px;
  margin-top: 30px;
  margin-right: -70px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 20px;
  height: auto;
  border-radius: 6px;
  border: 1px solid #B8B8B8;
  background: #F7F8FA;
  box-shadow: 0px 4px 19px 0px rgba(0, 0, 0, 0.10);
}

  .box_number_one
  {
    border-radius: 6px;
    background: #FFF;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.20);
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 10px;
    height: 48vh;
    overflow-y: auto;
  }
  .box_number_one::-webkit-scrollbar
  {
   display: none;
  }
  .box_number_two
  {
    border-radius: 6px;
    background: #FFF;
     box-shadow: 0px 13px 12px 0px rgba(113, 101, 101, 0.192);
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 10px;
    height: 48vh;
    overflow-y: auto;
  }
  .box_number_two::-webkit-scrollbar
  {
   display: none;
  }
  .box_number_three
  {
    border-radius: 6px;
    background: #FFF;
     box-shadow: 0px 13px 12px 0px rgba(113, 101, 101, 0.192);
    padding-bottom: 10px;
    height: 48vh;
    overflow-y: auto;
  }
  .box_number_three::-webkit-scrollbar
  {
   display: none;
  }
  .left_head_1
  {
    color: #000;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 600;
  }
  .background_pink_new
  {
    border-radius: 5px;
border: 1px solid #EBEBEB;
background: #FFE9E9;
color: #000;

text-align: center;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 600;
  }
  .background_yellow_new
  {
    border-radius: 5px;
border: 1px solid #EBEBEB;
background: #FFF9E9;
color: #000;

text-align: center;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 600;
  }
  .background_blue_new
  {
    border-radius: 5px;
border: 1px solid #EBEBEB;
background: #E9F7FF;
color: #000;

text-align: center;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 600;
  }
  .background_pink_dark_new
  {
    border-radius: 5px;
border: 1px solid #EBEBEB;
background: #F7E9FF;
color: #000;

text-align: center;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 600;
  }
  .flex_new
  {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .chelsford_new_changes
  {
    color: #000;

    font-family: Roboto;
    font-size: 20px;
    font-style: normal;
    font-weight: 600; 
  }
  .chelsford_new_changes2
  {
    color: #818181;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  }
  .chelsford_new_changes1
  {
    color: #000;

    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 600; 
  }
  #icon_new_changes
  {
    padding-top: 20px;
    color: gray;
  }
  .newbusiness
  {
    padding-left: 6px;
    color: #333;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;
  }
  .newbusiness1
  {
    color: #8C8C8C;
font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;
  }
  .position_rel
  {
    position:relative;
  }
  .button_pos
  {
    position: absolute;
    bottom: 10px;
    width: 87%;
    border-radius: 7px;
    border: 1.5px solid #D7D7D7;
    background: #FFF !important;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.20);
    color: #000;
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
  }
  .button_pos:hover
  {
    position: absolute;
    bottom: 10px;
    width: 87%;
    border-radius: 7px;
    border: 1.5px solid #D7D7D7;
    background: #FFF !important;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.20);
    color: #000;
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
  }
  .button_pos:focus
  {
    position: absolute;
    bottom: 10px;
    width: 87%;
    border-radius: 7px;
    border: 1.5px solid #D7D7D7;
    background: #FFF !important;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.20);
    color: #000;
    font-family: Roboto;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
  }
  .new_changesbusiness
  {
    color: #8B8B8B;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
  }
  .icon_width_new
  {
    width: 20px;
    height: 20px;
  }
  .icon_width_new1
  {
    width: 24px;
    height: 18px;
  }
  .icon_width_new2
  {
    width: 20px;
    height: 14px;
  }
  .margin_drop_cus
  {
    margin-top: 0px;
  }
  .item_width
  {
    width: 10%;
  }
  .top_margin_neg
  {
    margin-top: -26px;
    margin-bottom: 10px;
    position: relative;
    z-index: 100;
    border-radius: 5px;
    background-color: #13131379;
    color: #FFF;
    text-align: center;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
  }
  .secondary_button_pills
  {
    background-color: #F1F1F1 !important; 
    border: 1px solid #F1F1F1 !important; 
    color: #757575;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .icon_looc
  {
    width: 20px;
  }
  .button_width_slots
  {
    font_style: Poppins !important;
    width: 40% !important;
    background-color: #EC1E27 !important;
    border-radius: 10px !important;
    font-size: 16px;
  }
  .border_new_slots
  {
    border: 1px solid #F6F6F6 !important;
    background-color: white;
  }
  .active_slots
  {
    background-color: #EC1E27;
    color: white; 
    border-radius: 5px;
  }
  
  .img_pointer
  {
    cursor: pointer;
    width: 80%;
  }
  .font-family-poppins
  {
    color: #424242;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .border_slots_calender
  {
    background-color: white !important; 
    border-radius: 8px;
    border:  1px solid #DCDCDC;
  }
  .position_down_icon
  {
    position:absolute;
    margin-top: -8px;
    margin-left: -20px !important;
  }
  .iimg_top_dotted
  {
    margin-top: -18px;
    padding-left: 1px;
  }
  .iimg_top_simple
  {
    margin-top: -19px;
    padding-left: 1px;
  }
  .iimg_top_simple2
  {
    margin-top: -26px;
    padding-left: 1px;
  }
  .sub_services_primary_s
  {
    margin-left: -3px;
    color: #858585;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .font_pannel
  {
    color: #000;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
  }
  .font_pannel_g
  {
    color: #808080;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 550;
  }
  .fae--textt
  {
    font-size: 15px;
  }
  .fae--text {
    font-size: 13px;
    font-weight: 500;
    color: #000;
}
  .background_footer
  {
    background-color: #EBEBEB;
    padding-left: 15%;
    padding-Right: 15%;
  }
  .profl_color_page
  {
    background-color: #f8fafc;
  }
  .height_ipad_services
  {
    height: 30vh;
  }
  .card_placeholder1
  {
    width: 30%;
    border-radius: 0px;
    box-shadow: none !important; 
    outline: none !important;
  }
  .map_styles
{
  height: 270px;
  width: 100%;
  marginTop: 1rem;
  border-radius: 1rem;
}

  .font_unverified
  {
    font-size: 10px;
    color: #FF5066;
    font-weight: 600;
  }

  .dropdown_search_text
  {
    list-style-type: none;
    background-color: white;
    color: black;
    max-height: 35vh;
    overflow-y: auto;
    overflow-x: hidden;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  .borderline
  {
    border-left: 1px solid rgb(233, 0, 0);
    border-right: 1px solid rgb(233, 0, 0);
    border-bottom: 1px solid rgb(233, 0, 0);
    border-top: 1px solid #F8F8F8;
    overflow-y: hidden;
  }
  .unactive_input
  {
    background-color: white;
    border: 1px solid #E90000;
    padding: 0.5rem 1rem;
    border-radius: 8px !important;
  }

  .active_input
  {
    background-color: white;
    border-top: 1px solid #E90000;
    border-left: 1px solid #E90000;
    border-right: 1px solid #E90000;
    border-bottom: 0px solid #E90000;
    padding-top: 0.5rem;
    padding-bottom: 0rem;
    padding-right: 0.5rem;
    border-top-left-radius: 8px !important;
    border-top-right-radius: 8px !important;
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }

  .background_address_line
  {
    background-color: white;
    border: 0.4px solid #DCDCDC;
    border-radius: 8px;
  }

  .img_border_rad
  {
    border-radius: 10px;
  }
  .background-chat_tags
  {
    background-color: #F8FAFC;
    border: 1px solid lightgray;
    border-radius: 10px;
  }

  .background-chat_tags_new
  {
    background-color: #F8FAFC;
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 20%;
  }
  .font_chat_text
  {
    font-size: 14px;
  }
  .border_for_modal
  {
    color: gray;
    font-size: 10px;
    border: 1px solid #DC0000;
    border-radius: 10px;
  }
  .font_size_m
  {
    font-size: 10px;
    color: gray;
  }
  .input_grp_border
  {
    border: 1px solid #DCDCDC;
    border-radius: 10px;
    overflow: hidden;
   
  }
  .input_grp_border::placeholder
  {
    color: #A1A1A1;
  }
  #paper_clip
  {
    color: #A1A1A1;
  }
  .border_remove_input
  {
    border: 0px solid white;
    outline: none;
    box-shadow: none;
  }
  .border_remove_input:focus
  {
    border: 0px solid white;
    box-shadow: none;
    outline: none;
  }
  .background_buttons_input
  {
    outline: none;
    background-color: white !important;
    border: 0px solid white;
  }
.color_for_mob_button
{
  border-radius: 10px !important;
  font_style: Poppins !important;
    width: 40% !important;
    font-size: 16px;
}
  .font_lightgray
  {
    color: lightgray;
  }

  .day {
    text-align: center;
    cursor: pointer;
  }
  
  .day.selected {
    color: white;
    border: 2px solid red;
    background-color: #E90000;
  }
  .day.selectedd_pc {
    color: red;
    background-color: #E90000;
    border: 2px solid red;
    color: white;
    font-weight: 600;
    border-radius: 7px;
  }

  
  
  .calendar-days
  {
      display: flex;
      flex-direction: row;
      width: 100%;
      overflow-x: auto;
  }
  
  .calendar-days_pc
  {
      display: flex;
      flex-direction: row;
      width: 100%;
      overflow-x: scroll;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background: rgba(211, 211, 211, 0);
  }
  .calendar-days_pc::-webkit-scrollbar
  {
      display: none;
  }

  .width_active_date
  {
    
    background: #D10000;
    width: 70px; 
    border: 2px solid #D10000;
    border-radius: 10px;
    cursor: no-drop;
    font-size: 14px;
    color:  #FFF;
    font-weight: 600;
    height: 70px;
  }
  .color_dist
  {
    color: #36ABFF;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .background_selected
  {
    border-radius: 5px;
    background: #F8FAFF;
    color: #424242;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .item_card
  {
      padding-left: 10px;
      padding-right: 10px;
      border: 1px solid lightgray;
      color:  lightgray;
      margin-right: 10px;
      border-radius: 10px;
      background-color: white;
      text-align: center;
  }
  .item_card_pc
  {
      padding-left: 15px;
      padding-right: 15px;
      background-color: white;
      border-radius: 8px;
      border: 0.5px solid #DCDCDC;
      color: #6D6B6B;
      font-family: Roboto;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      margin-right: 11px;
      padding-top: 3px;
      padding-bottom: 2px;
      text-align: center;
  }
  .border_date_and_time
  {
    border: 0.5px solid #CECECE;
    border-radius: 8px;
  }
  .calendar-days::-webkit-scrollbar
{
    display: none;
}
 
  .card_serices_by_industry_id
{
  overflow-y: hidden;
  background-color: white;
  border-radius: 8px;
  border: solid 1px #dcdcdc;
  }

  .card_serices_by_industry_id:hover
  {
    border: solid 1px #DC0000;
    transition: 0.9s;
    }

  .card_serices_by_industry_id1
  {
    overflow-y: hidden;
    background-color: white;
    border-radius: 8px;
    border: 0.4px solid #DCDCDC;  
    }
  .my_video
  {
    width: 57% !important;
    margin-top: 1.2%;
    padding-left: .8%;
    padding-right: .8%;
  }
  .position_main_container
  {
   position: relative;
   z-index: 111;
   overflow-y: hidden;
   overflow-x: hidden;
   height: 50vh;
   margin-bottom: -70px;
  }
  .position_abs_monitor
  {
    position: absolute;
    z-index: 122;
  }
  .points_content_detail_page
  {
    line-height: 200%;
    color: #565656;
  }
.overflow_x_content_detail_page
{
  overflow-x: hidden !important;
}
  .mobile_screen_display
  {
    display: none;
  }
  .item
  {
    width: 18%;
  }
  .flex-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .card-container1::-webkit-scrollbar
  {
    display: none;
  }
  .main_card_ser_mob
  {
    border-radius: 12px;
background: #FFF;
box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.05);
  }
  .p_tag_serv
  {
    color: #414141;

font-family: Poppins;
font-size: 12px;
font-style: normal;
font-weight: 400;
  }
  .text_see_more
  {
    color: #7C7C7C;

text-align: right;
font-family: Poppins;
font-size: 12px;
font-style: normal;
font-weight: 400;
  }
  .margin_top_negative_ser
  {
    margin-top: -60px;
    margin-bottom: 40px;
  }
  .ser_card
  {
    color: #949494;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;
  }
.background_card_ser
{
background-color: #ffffffec !important;
color: #414141;
text-align: center;
font-family: Roboto;
font-size: 16px;
font-style: normal;
font-weight: 500;
letter-spacing: 0.16px;
text-transform: uppercase;
}

  .padding_recommended_active
  {
    border-radius: 50px;
    font-family: Roboto;
    background-color: #D00C0C !important;
    font-size: 14px;
    color: white !important;
  }
  .padding_recommended_unactive
  {
    
    border-radius: 44px;
    background: #E7E8EC !important; 
    color: #787878;
  }
  .card-container1
  {
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
  }
  .cardd {
    width: 300px !important; /* Adjust the width of each card as needed */
    
  }
  .new2 {
    width: 500px !important; /* Adjust the width of each card as needed */
    
  }
  .book_n
  {
    color: #000;

text-align: center;
font-family: Roboto;
font-size: 12px;
font-style: normal;
font-weight: 400;
  }
  .dropdown_size
  {
    width: 300px !important;
    height: 345px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-right: -130px;
  }
  .dropdown_size::-webkit-scrollbar {
  display: none;
  }
  .height_country_drop
  {
    height: 25vh;
    overflow-y: auto;
    overflow-x: hidden;
  }


  .dropdown_size2
  {
    width: 351px !important;
    height: 316px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 10px;
    margin-right: -195px;
  }

  .grecaptcha-badge {
    display: none !important;
}
  .img-transition {
    transition: transform 3s ease-in-out;
  }
  .img_rad
  {
    border-radius: 13px !important;
    object-fit: cover;
    height: 282px;
    width: 198px;
  }
  .new_screen_position
  {
    position: relative;
    z-index: 1;
  }
  .new_screen_position2
  {
    position: absolute;
    z-index: 9999;
    width: 49%;
    height: 75vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .new_screen_position_auto
  {
    position: absolute;
    z-index: 9999;
    width: 49%;
    height: auto;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .new_screen_position3
  {
    position: absolute;
    z-index: 9999;
    width: 60%;
    height: 40vh;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 1px 1px 7px 7px rgba(35, 35, 35, 0.253);
  }
  .img_height_search
  {
    height: 40px;
    width: 40px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .font_size_search
  {
    font-size: 14px;
    color: black;

  }
  .bg_section_off 
{
  background-color: #F6F6F6 !important;
  border-radius: 14px;
}
  .card-container-wrapper {
    display: flex;
    overflow: hidden;
}



.card-container {
    display: flex;
    transition: transform 0.5s ease-in-out;
}

.card-container:hover {
    cursor: pointer;
}

.card-container:hover .card-container {
    transform: translateX(-33.333%);
}
  .height_width_scroller
  {
    margin-bottom: 40px;
    width: 100%;
    height: 90vh;
    background: rgba(0, 0, 0, 0.5);
  }
  .parent_pos
  {
    position: relative;
    z-index: 0;
    
  }
  .display_newnew
  {
    color: #FFF;
    font-family: Bebas Neue;
    font-size: 84px;
    font-style: normal;
    font-weight: 400;
    text-transform: uppercase;
    line-height: 95.523%;
  }

  .child_pos
  {
    position: absolute;
    margin-bottom: 100px;
    z-index: 1;
  }
  .padding_new_conv
  {
    padding-right: 20%;
    padding-left: 5%;
  }
  .button_exp_style
  {
    background-color: rgba(102, 51, 153, 0) !important;
    border: 1px solid #F00;
  }

  .margin_top_neg
  {
    position: relative;
    z-index: 1;
    margin-top: -400px;
    margin-bottom: 50px;
  }
  .margin_top_crousal1_neg
  {
    margin-top: -60px !important;
    color: #FFF;

    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 95.523%; /* 24.836px */
    letter-spacing: 0.26px;
    text-transform: uppercase;

  }
  .object_fitt
  {
    height: 40vh;
    width: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
 
  
  .img_height_width
  {
    height: 300px !important;
    width: 450px !important;
    object-fit: cover;
    border-radius: 10px;

  }
  .all_ser_heading
  {
    color: #414141;
    font-family: Poppins;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
  }
  .all_ser_para
  {
    color: #797979;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
  .price
  {
    color: #E30000;
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;

  }
  .all_ser_sub_heading
  {
    color: #6C6C6C;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
  .light_gray_back
  {
    background-color: #F6F6F6;
    padding-top: 7%;
    padding-left: 15%;
    padding-right: 15%;
    padding-bottom: 7%;
  }
  .un_fav_button
  {
    height: 30px;
    width: 30px;
    margin-top: 35px;
  }
  .button_book_now
{
color: #000;
text-align: center;
font-family: Poppins;
font-size: 18px;
font-style: normal;
font-weight: 500;
background-color: #FFFFFF !important;
border-radius: 8px;
}
.button_book_now:hover
{
  background-color: #D10000 !important;
  color: white !important;
}
.button_book_now2
{
  background-color: #F6F6F6 !important;
  color: #000;
  text-align: center;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 500 !important;
  border-radius: 8px;
}
.button_book_now2:hover
{
  background-color: #D10000 !important;
  color: white !important;
}
  .button_for_pos{
    cursor: pointer;
  }
  .position_left_right_allser
  {
    background-color: #FFFFFF;
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 7%;
    padding-bottom: 7%;
  }
  .PhoneInputInput
  {
    border: 0px solid white !important;
    outline: none;
    color: #444;
    font-size: 14px;
    font-weight: 400;
  }
  .overflow_new 
  {
    overflow-x: hidden;
  }
  .primary_email_label
  {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: rgb(170, 170, 170);
  }
  .primary_email_text
  {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: black;
  }
  .icon_red
  {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    font-weight: 500;
    color: #D61614;
  }
  .background_main_email
  {
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 6px;
  }
  .input_style
  {
    border: none;
    outline: none;
  }
  .button_width_verify
  {
    width: 45%;
    background-color: #D61614;
  }
  .itemmm
  {
    flex: 0 0 calc(20% - 10px); /* Adjust the width as needed */
    margin: 5px; /* Add margin to create space between divs */
    
  }
  .padding_bottom_boking
  {
    padding-bottom: 10%;
  }
  .flex_using_booking_d
  {
    display: flex;
    justify-content: center;
  }
  .th_Jan
  {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #b2bac5;
  }
  .Completed {
  
    font-family: Poppins;
    font-size: 8px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #b2bac5;
  }
  .Completed1 {
  
    font-family: Poppins;
    font-size: 8px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #e90000;
  }
  .th_Jan1 {
  
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: #e90000;
  }
  .light_b
  {
    padding: 6px 12px;
    border-radius: 6px;
    background-color: #f0f4f5;
  }
  .light_r
  {
    padding: 6px 12px;
    border-radius: 6px;
    background-color: #FDE5E5;
  }
  .active_tab
  {
    padding: 4px 12px 3px;
  border-radius: 6px;
  background-color: #e90000;
  }
  .th_Jan_active
  {
    font-family: Poppins;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color: white;
  }
  .border_booking
  {
    border-radius: 10px;
  border: solid 0.8px #dcdcdc;
  background-color:  white;
  }
  .label_booking_txt
  {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #aaa;
  }
  .color_status_red
  {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: red;
  }
  .newimgaes_of
  {
    height: 153px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .img_positioning_pfu
  {
    position: relative;
    z-index: 11;
    height: 300px !important;
    width: 200px !important;
    object-fit: cover;
    border-radius: 10px;
    max-width: none !important;
  }
  .img_positioning_pfu2
  {
    position: relative;
    z-index: 11;
    height: 260px;
    width: 90%;
    object-fit: cover;
    border-radius: 10px;
  }
  .color_adjust_search
  {
    background-color: rgba(236, 236, 236, 0.527);
    border-radius: 10px;
  }
  .load_button_color
  {
    background-color: #DF0303 !important;
    border: 1p solid #DF0303 !important; 
  }
  .img_size_set
  {
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 50%;

  }
  .card_adj
  {
    height: 250px;
    width: 200px;
  }
  .border_discount
  {
    border-radius: 8px;
    border: 0.4px solid #DCDCDC;
    background: #FFF;
  }
  .discount_code_text
  {
    color: #AAA;

font-family: Roboto;
font-size: 10px;
font-style: normal;
font-weight: 400;
  }
  .icon_font_locc
  {
    width: 12px;
  }
  .universal_cursor
  {
    cursor:pointer;
  }
  #universal_cursor
  {
    cursor:pointer;
  }
  // body::-webkit-scrollbar-track {
  //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  //   border-radius: 10px;
  //   background-color: #F5F5F5;
  // }
  
  // body::-webkit-scrollbar {
  //   width: 8px;
  //   background-color: #F5F5F5;
  // }
  
  // body::-webkit-scrollbar-thumb {
  //   border-radius: 10px;
  //   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  //   background-color: #D62929;
  // }

  .background_color_redd_landing_header
  {
    background-color: #D10000;
    padding-bottom: 1%;
  }

  .sloganTextmain {
    font-family: "poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 9px;
  }
  
  .sloganBold {
    font-weight: 600;
  }
  
.using_flex_count
{
  display: flex;
  flex-direction: row;
  justify-content: right;
}
  .img_height_set
  {
    height: 50vh;
  }
  .width_height_set_not
  {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;

  }
  .new_width_set
  {
    width: 100%;
  }
  .new_width_set1
  {
    width: 30px;
    height: 20px;
    border-radius: 5px;
    object-fit: cover;
  }
  .new_width_set2
  {
    margin-top: 6px;
    width: 21x;
    height: 21px;
    cursor: pointer;
  }
.shadow_new
{
  box-shadow: 0px 13px 12px 0px rgba(113, 0, 0, 0.192);
}
  #white_icon
  {
    color: white;
  }

  .padding_all_ser
  {
    padding-left:  8%;
    padding-right: 8%;
  }
  
 

  .position_set_notifcation
  {
    position: absolute;
    z-index: 1000;
    width: 20%;
    background-color: white;
    top: 70px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 10px;
  }
  .pointer_cursor_nonactive
  {
    cursor: no-drop;
    color: lightgray;
  }
  .flex_for_notificaton
  {
    display: flex;
    flex-drirection: row;
    border: 1px solid gray;
    border-radius: 8px;

  }
  .font_14px
  {
    font-size: 12px;
  }
  .font_14px_elipse
  {
    font-size: 12px;
    white-space: nowrap; 
    width: 150px; 
    overflow: hidden;
    text-overflow: ellipsis; 
  }
  .pointer_cursor_active
  {
    cursor: pointer;
  }

  .img_flag_width
  {
    width: 8%;
  }
  .swiper-pagination
  {
    text-align: right !important;
    padding-right: 20px !important;
  }
  .swiper-pagination-bullet-active
  {
    background: black !important;
  }
  

  .button-glow {
    background-color: #004A7F;
    border: none;
    color: #FFFFFF;
    cursor: pointer;
    border-radius: 5px;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    -webkit-animation: glowing 1500ms infinite;
    -moz-animation: glowing 1500ms infinite;
    -o-animation: glowing 1500ms infinite;
    animation: glowing 1500ms infinite;
  }
  @-webkit-keyframes glowing {
    0% { background-color: #B20000; -webkit-box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; -webkit-box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; -webkit-box-shadow: 0 0 3px #B20000; }
  }
  
  @-moz-keyframes glowing {
    0% { background-color: #B20000; -moz-box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; -moz-box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; -moz-box-shadow: 0 0 3px #B20000; }
  }
  
  @-o-keyframes glowing {
    0% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
  }
  
  @keyframes glowing {
    0% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
    50% { background-color: #FF0000; box-shadow: 0 0 40px #FF0000; }
    100% { background-color: #B20000; box-shadow: 0 0 3px #B20000; }
  }

  /* Add this to your CSS */
@keyframes speaking-waves {
  0% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.1);
  }
  100% {
    transform: scaleY(1);
  }
}

.speaking-waves {
  animation: speaking-waves 0.5s infinite;
  transform-origin: bottom center;
}

.font_london
{
  color: #FFF;
font-family: Poppins;
font-size: 12px;
font-style: normal;
font-weight: 500;
line-height: 95.523%; /* 11.463px */
}

  .position_set_mob_landing
  {
    padding-top: 5%;
    color: white;
    padding-left: 4%;
    padding-right: 4%;
    width: 100%;
  }
  .right_tendon
  {
    background-color: white;
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  .big_heading
  {
    color: black;
  }
.color_button_mob_landing
  {
    background-color: #FF6767 !important;
    border: 1px solid #FF6767 !important;
  }
  .display_ind_sec
  {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    overflow-x: scroll;
  }
  .height_width_landing_ind
  {
    height: 43px;
    width: 43px;

    
  }
  .service_ind_p
  {
    color: #5F5F5F;

    text-align: center;
    font-family: Poppins;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
  }
  .width_adj_ind
  {
    width: 300px !important;
  }
  .background_mobile_header
  {
    background: linear-gradient(180deg, #E90000 41.52%, #930808 137.1%);
  }
  .input_left_tendon
  {
    border: none;
    outline: none;
    box-shadow: none;
  }
  .input_left_tendon:focus
  {
    border: none;
    outline: none;
    box-shadow: none;
  }
  .input_left_tendon::placeholder
  {
    color: #9A9A9A;

    font-family: Poppins;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .heroSlidermob
  .position_set_notifcation
  {
    position: absolute;
    z-index: 1000;
    width: 20%;
    background-color: white;
    top: 75px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 10px;
  }
  .position_set_notifcation1
  {
    position: absolute;
    z-index: 1000;
    width: 20%;
    background-color: white;
    top: 75px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 10px;
    height: 40vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .background_sec4_p
  {
    background-image: url(/imagess/redicons/backgroundnew.png);
    background-size: cover;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
  }
  .heading_color_p_1
  {
    color: #FFF;
font-family: Playfair Display;
font-size: 18px;
font-style: normal;
font-weight: 700;
  }
  .sub_heading_color_p_1
  {
    color: #F1F1F1;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
  }
  .ssub_heading_color_p_1
  {
    color: #F1F1F1;
font-family: Montserrat;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
  }
  .width_img_setting_p
  {
    border-radius: 30px;
  }
  .sec4_text_1
  {
    color: #FFF;
font-family: Playfair Display;
font-size: 40px;
font-style: normal;
font-weight: 700;
line-height: normal;
  }
 
  .background_p_sec2
  {
    background-image: url(/imagess/redicons/sidecir.png);
    background-size: 40% 100%;
    position: relative;
    background-position: contain;
    background-repeat: no-repeat;
    height: 70vh;
  }
  .padding_set_second_sec_p
  {
    padding-top: 20% !important; 
  }
  .background_provider_page
  {
    background-image: url(/imagess/redicons/backgroundimg.png);
    background-size: cover;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    z-index: 199;
  }
  .first_p_text
  {
    color: #000;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .first_p_text1
  {
    color: #000;
    font-family: Playfair Display;
    font-size: 40px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .button_p
  {
    color: #FFF4E8;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    background-color: #EC1E27 !important;
    padding-left: 8%;
    padding-right: 8%;
    padding-top: 2%;
    padding-bottom: 2%;
    
  }
  .border_bottom_set
  {
    border-bottom: 1px solid #000;
  }
  .border_bottom_set_non_act
  {
    color: #B1B4B7;
font-family: Roboto;
font-size: 16px;
font-style: normal;
font-weight: 400;
  }
  .neg_mar_provider
  {
    margin-top: -145px;
    position: relative;
    z-index: 200;
  }
  .red_p_text
  {
    color: #EC1E27;
font-family: Roboto;
font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-decoration-line: underline;
  }
  .para_text_p
  {
    color: #6C6C6C;
font-family: Roboto;
line-height: 150%;
font-size: 18px;
font-style: normal;
font-weight: 500;
  }
  .img_width_p
  {
    width: 70%;
    padding-top: 10%;
  }
  .padding_managae_firstcol
  {
    padding-top: 10%;
  }
  .img_rounded_circle_new
  {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }
  .label_address_font_pixl
  {
    color: gray;
    font-size: 10px;
    font-family: Roboto;
  }
  .font_for_address_inputs
  {
    margin-left: 0px;
    outline: none;
    background-color: transparent;
    font-size: 14px;
    width: 100%;
    font-family: Roboto;
    padding-left: 0px !important;
  }
  .font_for_address_inputs::placeholder 
  {
    color: lightgray;
  }
  .react-calendar {
    padding-top: 5%;
    padding-bottom: 5%;
    width: 100% !important;
    border-radius: 8px !important;
    border: 1px solid lightgray !important;
  }
  
.react-calendar__tile--active {
  background-color: #D62929 !important;
  border-radius: 8px !important;
}

.react-calendar__tile--now {
  background-color: #ed9999 !important;
  color: white !important;
  border-radius: 0px !important;
  border: 2px solid red !important; 
}
.react-calendar__month-view__weekdays__weekday abbr 
{
  font-family: Roboto !important;
  color: #CCD2D8  !important;
}
.react-calendar__tile react-calendar__month-view__days__day abbr
{
  font-family: Roboto !important;
  color: red  !important;
}
  input[type='radio'] {
    border: 1px solid red !important;
  }
  .profile_cards
{
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 8px;
  border: solid 0.8px #dcdcdc;
  background-color: white;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000;
}
  .color_red_new
  {
    color: red !important;
  }
  .main_headingg_new
  {
    font-size: 39px;
  }
  .get_a_text
  {
    font-size: 22px;
    font-weight: 300;
    color: #858585;
  }
  .head_free_body
  {
    font-size: 26px;
  }
  .head_free_body2
  {
    font-size: 22px;
    color: #585858;
  }
  .p_tag_service
  {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    color: #565656;
    line-height: 22px;
  }
  .img_width_monitor
  {
    width: 58%;
  }
  .img_width_mobile
  {
    width: 80%;
  }
  .page_scroll
  {
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 20%;
  }

  .page_scroll::-webkit-scrollbar
{
    display: none;
}
  
 
  .font_size_set_stories
  {
    color: gray;
    font-size: 14px;
  }
  .img_circle
  {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    object-fit: cover;
  }
  .img_height_width_set
  {
    height: auto;
    border-radius: 10px;
  }
  .position_relative
  {
    position: relative;
    z-index: 10;
  }
  .position_aa
  {
    margin-top: -70px !important;
    position: absolute;
    z-index: 11;
  }
.background_color_button
{
  background: #dc0000;
  color: #fff;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 500;
}
  
  .custom_padding_contentpage
  {
    padding-left: 5%;
    padding-right: 5%;
  }
  .custom_padding_contentpage_new
  {
    padding-left: 3%;
    padding-right: 3%;
  }
  .custom_padding_contentpage1
  {
    padding-left: 15%;
    padding-right: 10%;
  }
  
  .background_color_sec_1
  {
    background-image: url(/imagess/backgroundcontent.png);
    height: 70vh;
  }
  .background_color_sec_22
  {
    background-image: url(/imagess/backgroundcontent.png);
    height: 70vh;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .background_color_sec_2
  {
    background-color: #F5F9FC;
    height: auto;
  }
  .bg_gray_back
  {
    background-color: rgb(246, 248, 251);
    border-radius: 10px;
  }
  .h1_sec1_landingpage
  {
    font-size: 28px;
    font-weight: 600;
    font-family: Roboto;
    color: #333;
  }
  .padding_top_custon_sec1
  {
    padding-top: 6%;
  }
  .box_shadow_card
  {
    box-shadow: 0 2px 8px 0 rgba(99,99,99,.2);
    margin-top: -50px !important;
    border-radius: 10px;
  }
  .font_color_set
  {
    font-size: 18px;
    color: #565656;
  }
  .font_color_red
  {
    font-size: 18px;
    color: rgb(220, 0, 0);
  }
  .strong_tag
  {
    font-size: 38px; 
    color: rgb(51, 51, 51);
  }
  .width_dropdown
  {
    width: 120px !important;
  }
  .p_sec2_landing
  {
    font-size: 14px;
    font-weight: 400;
    font-family: "Roboto",sans-serif;
    line-height: 22px;
    color: #858585;
    padding: 0.5rem 0 1.5rem;
    margin: 5px 0;
  }
  .input_outline_input_field
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #6c6c6c;
  border: 0px solid black;
  }
  .input_outline_input_field:focus
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #6c6c6c;
  border: 0px solid black;
  }
  .input_outline_input_field::placeholder
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #6c6c6c;
  padding-left: 0px;
  }
  .d_s_1
  {
    font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #aaa;
  padding-left: 2px;
  }
  .s_f_1
  {
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #000;
  }
  .s_f_2
  {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #6c6c6c;
  }
  .width_icon_add
  {
    width: 50px;
    height: 50px;
  }
  .font_21
  {
    color: #000;
font-family: Poppins;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 163%; /* 26.08px */
  }
  .font_20
  {
    color: #000;
font-family: Poppins;
font-size: 41px;
font-style: normal;
font-weight: 600;
line-height: 116.523%; /* 47.774px */
text-transform: capitalize;
  }
  .font_srze_11
  {
    color: #FFF;
font-family: Poppins;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 163%; /* 26.08px */
  }
  .font_set_10
  {
    color: #FFF;
font-family: Poppins;
font-size: 41px;
font-style: normal;
font-weight: 600;
line-height: 116.523%; /* 47.774px */
text-transform: capitalize;
  }
  .padding_removal
  {
    padding-left: 0px;
  }
  .padding_removal1
  {
    padding-right: 0px;
    background: #A67268;
  }
  .background_sec_89
  {
    background-color: #BFA58D;
    padding-top: 5%;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    color: white;
  }
  .background_sec_99
  {
    background-color: #A67268;
    padding-top: 5%;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    color: white;
  }
  .f_family_sec
  {
    color: #FFF;
    text-align: center;
    font-family: Great Vibes;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: 118.023%;
  }
  .f_family_sec2
  {
    color: #FFF;
font-family: Poppins;
font-size: 41px;
font-style: normal;
font-weight: 600;
line-height: 116.523%;
text-transform: capitalize;
  }
  .f_familysec_3
  {
    color: #FFF;
font-family: Poppins;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 106.523%; /* 19.174px */
text-transform: capitalize;
  }
  .f_family_sec4
  {
    color: #FFF;
text-align: center;
font-family: Poppins;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: 106.523%; /* 19.174px */
text-transform: capitalize;
  }
  .text_size_sec4
  {
    color: #000;
text-align: center;
font-family: Poppins;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 106.523%; /* 25.565px */
text-transform: capitalize;
  }
  .text_size_sec5
  {
    color: #6A6A6A;
font-family: Poppins;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 163%;
  }
  .padding_set_left
  {
    padding-left: 160px;
  }
  .padding_set_right
  {
    padding-right: 160px;
    
  }
  .custom_padding_1
  {
    padding-right: 5%;
    padding-left: 5%;
  }
  .font_set_heading_1
  {
    font-family: Roboto;
    font-size: 14px;
    color: white;
    line-height: 163%; 
  }
  .heading_service_page_main
  {
    font-family: 'Great Vibes', cursive;
    font-size: 85px;
    color: white;
  }
  .button_custom_service
  {
    border-radius: 30px;
    background: #F00;
    color: white;
    border: 1px solid #F00;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 2%;
    padding-right: 2%;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .padding_for_sec1
  {
    
    padding-top: 10%;
  }
  .overflow_scrool_service
  {
    overflow-y: scroll !important;
    height: 100vh;
    padding-bottom: 10%;
  }
  .button_setting
  {
    position: absolute;
    bottom: 40px;
    text-align: center;
    padding-left: 7%;
    padding-right: 7%; 
    color: #000;
      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      left: 30%;

  }
  .button_setting2
  {
    position: absolute;
    bottom: 40px;
    text-align: center;
    padding-left: 7%;
    padding-right: 7%; 
    color: #000;
      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      left: 40%;

  }
  .background_secc_2
  {
    background-image: url(/imagess/redicons/girl1.png);
    background-size: cover;
    position: relative;
    background-position: center;
    height: 70vh;
    background-repeat: no-repeat;
    border-raius
  }
  .background_secc_3
  {
    background-image: url(/imagess/redicons/girl2.png);
    background-size: cover;
    position: relative;
    background-position: center;
    height: 30vh;
    background-repeat: no-repeat;
  }
  .background_cupon
  {
    background-image: url(/imagess/redicons/cupon.png);
    background-size: 100% 100%;
    background-position: center;
    height: 20vh;
    background-repeat: no-repeat;
  }
  .background_secc_4
  {
    background-image: url(/imagess/redicons/girl3.png);
    background-size: cover;
    position: relative;
    background-position: center;
    height: 37.5vh;
    background-repeat: no-repeat;
  }
  .background_img_sec1
  {
    background-image: url(/imagess/redicons/servicedetail1.png);
    background-size: 100% 100%;
    background-position: center;
    height: 80vh;
    background-repeat: no-repeat;
  }
  .background_img_sec2
  {
    background-image: url(/imagess/redicons/servicedetail2.png);
    background-size: center;
    background-position: center;
    height: 80vh;
    background-repeat: no-repeat;
  }
  .detailpage_h1
  {
    font-family: Roboto;
  font-size: 18px;
  font-weight: 900 !important;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.89;
  letter-spacing: normal;
  color: #000;
  }
  .badge_texture_active
  {
    padding: 4px 8px 3px !important;
  border-radius: 5px !important;
  background-color: #b8d693 !important;
  font-family: Roboto;
  font-size: 11px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
  }
  .badge_texture_pending
  {
    padding: 4px 8px 3px !important;
    border-radius: 5px !important;
    background-color: #e9b67a !important;
    font-family: Roboto;
    font-size: 11px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: white;
    }
  }
  .flex_direction_detail_page
  {
    display: flex;
    flex-direction: row;
  }
  .detailpage_h3
  {
    font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #aaa;
  }
  .detailpage_h2
  {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #6c6c6c;
  }
  .border_backsground_color
  {
    padding: 15px 5px 15px 15px;
    border-radius: 8px;
    border: solid 0.8px #dcdcdc;
    background-color: white;
  }
  .img_height_width_userdetail
  {
    height: 116px;
    width: 116px;
  }
  .img_height_width_userdetail2
  {
    height: 60px;
    width: 60px;
  }
  .detailpage_h4
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  }
  .detailpage_h5
  {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #6c6c6c;
  }
  .detailpage_h6
  {
    font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444;
  }
  .button_style
  {
    position: absolute;
    margin-top: 8px;
    margin-left: -20px;
    z-index: 100000;
    width: 1.4%;
  }
  .button_style1
  {
    position: absolute;
    margin-top: 8px;
    left: 135px !important;
    z-index: 100000;
  }
  .icon_color_every
  {
    color: #BEC3C7;
    font-size: 30px;
  }
  .icon_color_every2
  {
    color: #BEC3C7;
    font-size: 20px;
  }
  .dropdown-toggle
  {
    background-color: #ffffff00 !important;
    border: 0px solid #ffffff00  !important;
    padding: 0px !important;
  }
  .button_danger_one
  {
    padding: 6.5px 15px 6.5px 16px !important;
  border-radius: 6px !important;
  background-color: #ec1e27 !important;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  font-family: Roboto;
  }
  .search_bar_placeholder::placeholder
  {
   color: #ccd2d8;
  }
  .background_card_payment
  {
    background-image: url(/imagess/redicons/card.png);
    background-size: 100% 100%;
    background-position: center;
    border-radius: 15px !important;
  }
  .background_card_payment_default
  {
    background-image: url(/imagess/redicons/card1.png);
    background-size: 100% 100%;
    background-position: center;
    border-radius: 15px !important;
  }
  .input_font_header
  {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #aaa;
  }
  .button_set_search
  {
    background-color: white;
    border: 0px solid white;
    font-family: Roboto;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #aaa;
  }
  .input_field_text
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
  padding-left: 0px;
  }
  .outline_of_input_second
  {
    width: 100%;
  padding: 8px 737px 8px 15px;
  border-radius: 8px;
  border: solid 0.8px #dcdcdc;
  background-color: white;
  }
  .card_bank_text
  {
    font-family: Roboto;
  font-size: 18.4px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 0.37px;
  color: white;
  }
  .card_bank_text1
  {
    font-family: Roboto;
    font-size: 11.4px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: 0.23px;
    color: white;
  }
  .digits_cards
  {
    font-family: Roboto;
  font-size: 16.6px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: white;
  }
  .text_expire
  {
    font-family: Roboto;
  font-size: 13.9px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: normal;
  color: white;
  }
  .dropdown-toggle::after
  {
    display: none;
  }
 
  .justify_flex
  {
    justify-content: right;
  }

  .width_add_buttons
  {
    width: 5%;
  }
  
  .cards1 {
    background-color: white;
    border: 2px solid rgb(239, 240, 241);
    width: 12%;
    border-radius: 8px;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-top: 1%;
    text-align: center;
  }
  .img_width_cards {
    width: 18%;
  }
  .flex_of_cards {
    display: flex;
    flex-direction: row;
    
  }
  .width_img_contet
  {
    width: 100%;
  }

  .london_text_sub1 {
    position: absolute;
    bottom: 20px;
    right: 15px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #6c6c6c;
  }

  .fix_height_bookings
  {
    height: 85vh;
    overflow-y: scroll;
    padding-bottom: 100px;
    padding-left: 10%;
    padding-right: 10%;
  }

  .fix_height_bookings::-webkit-scrollbar
  {
 display: none;
  }


  .outline_of_input
  {
    padding: 10px 10px 10px 10px;
    background-color: white;
    border: 0.8px solid #dcdcdc;
    border-radius: 8px;
  }

  .outline_of_input1
  {
    padding: 8px 10px 10px 10px;
    background-color: white;
    border: 0.8px solid #dcdcdc;
    border-radius: 8px;
  }

  .input_search_selected_service
  {
    background-color: #F9F9F9;
  }

  .border_of_selected_services
  {
    border: 1.7px solid #dcdcdc;
  }

  .background_disabled_button
  {
    background-color: gray !important;
    color: white !important;
  }
  
  .outline_of_input:hover
  {
   border: 1px solid red !important;
  }

  .selection_css
  {
    border: 0.7px solid lightgrey;
    padding: 0.6rem 1rem;
    background-color: white;
  }

  .label_text_add_services
  {
      font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  }

  .permission_text
  {
 font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #b2bac5;
  }

  .Permission_new
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  color: #aaa;
  }

  .heading_services
  {
      font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #aaa;
  }

  .new_icon_role
  {
    width: 2.9%;
  }

  .font_inner_icon_services
  {
    width: 1.3%;
  }
  .setting_ul_text_font
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin-top: 8px;
  }
  .Allow_text
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: #c2c2c2;
  }
  .i_agree_text
  {
    font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #404145;
  }
  .role_add_new
  {
    font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #ec1e27;
  }

  .services_drop_down
  {
    background-color: white;
    border: 1px solid lightgray;
    padding: 1rem 1rem;
    margin: 0.8rem 0 1rem 0;
    width: 100%;
  }

  .para_text_services
  {
      font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #aaa;
  }

  .font_size_selected_ser
  {
    font-family: Roboto;
font-size: 15px;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: normal;
color: #aaa;
}

  .custom_padding1
  {
    padding-left: 6.5%;
    padding-right: 6.5%;
  }

  .heading_landing_page
  {
    color: black;
    font-family: Poppins;
    font-weight: 600 !important;
    font-size: 22px;
    line-height: 21px;
  }

  .heading_landing_page_mob
  {
    color: black;
    font-family: Poppins;
    font-weight: 600;
    font-size: 18px;
  }
  .background_banner_1
  {
    background-image: url(/imagess/girl.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size:100% 100%;
    border-radius: 10px;
  }

  .background_banner_2
  {
    background-image: url(/imagess/blue.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size:100% 100%;
    border-radius: 10px;
  }

  .big_offers_text
  {
    color: #000000;
    font-weight: bold;
    font-family: Poppins;
    font-size: 34px;

  }
  .width_ll
  {
    width: 100%;
  }
  .font_size_and_style
  {
    background-color: rgba(255, 0, 0, 0) !important;
    color: white;
    border-radius: 8px;
    font-size: 120%;
  }
  .font_size_and_style:hover
  {
    background-color: rgba(255, 0, 0, 0) !important;
    color: white;
    border-radius: 8px;
    font-size: 120%;
  }
  .color_of_becoming
  {
    color: white;
    font-size: 80%;
  }
  
  .img_dynamic
  {
    width: 208px;
    height: 276px;
    border-radius: 10px;
  }

  .big_offers_text1
  {
    font-family: Poppins;
font-size: 54px;
font-weight: 700;
line-height: 52px;
letter-spacing: 0em;
text-align: left;
color: #FF0000;
  }
  .react-multi-carousel-track
  {
    background-color: none !important;
  }
  .margin_right_set
  {
    padding-right: 20px;
    background-color: white !important;
  }

  .big_offers_des
  {
    color: #FFFFFF !important;
    font-family: Roboto;
    font-weight: 600;
    font-fize: 26px;
  }
.using_flex
{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

.using_flex_new
{
  display: flex;
  flex-direction: row;
  justify-content:  space-between;
  flex-wrap: wrap;
}


.border_background_new_blue
{
  background-color: #9CDBFF;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.border_background_new_red
{
  background-color: #FCC5ED;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}


.card_heading_text
{
  margin-top: -12px;
  font-family: Poppins;
font-size: 14px;
font-weight: 400;
line-height: 13px;
letter-spacing: 0em;
text-align: left;
color: #1E1E1E;
white-space: nowrap; 
width: 200px; 
overflow: hidden;
text-overflow: ellipsis; 
}
.card_heading_text2
{
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #9D9D9D;

}
.text_red_price
{
  font-family: Poppins;
  font-size: 18px;
  font-weight: 600;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;
  color: #CF0000;
}
.text_50
{
  font-family: Poppins;
font-size: 16px;
font-weight: 600;
line-height: 17px;
letter-spacing: 0em;
text-align: left;
color: #3A3A3A;
padding-left: 8px;
padding-right: 5px;
}
.text_15
{
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
  color: #CD3636;  
}
.text_16
{
  color: #141414;
  // text-align: right;
  font-family: Poppins;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  // padding-bottom: 5px;
}
.background_view_all
{
border-radius: 6px
font-family: Roboto;
font-size: 16px;
font-weight: 500;
line-height: 19px;
letter-spacing: 0em;
text-align: center;
color: #666666;
background-color: #EDEDED;
}
.unselected_numbers
{
  font-family: Roboto;
font-size: 20px;
font-weight: 400;
line-height: 23px;
letter-spacing: 0em;
text-align: center;
color: #C6C6C6;
width: 37px
height: 38px
top: 2548px
left: 895px
border-radius: 10px

}
.active_ind
{
height: 38px;
top: 2548px;
left: 895px;
border-radius: 10px;
background-color: #FF6767 !important;
border: none;
}
  .bg_card_ground
  {
   
    height: 355px;
    border-radius: 7px !important;
   position: relative;
   z-index: 10;
   box-shadow: rgba(204, 204, 204, 0.247) 0px 0px 50px;
   
  }
  .img_rad_offers
  {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    object-fit: cover;
    height: 150px;
  }
  
.margin_top_negg
{
  margin-top: -110px;
  position: relative;
  z-index: 11;
  padding-bottom: 10px;
  padding-left: 15px !important;
  padding-right: 15px !important;
  padding-bottom: 10%;

}
.margin_top_negg_offers
{
  margin-top: -85px;
  position: relative;
  z-index: 11;
  padding-bottom: 10px;
  padding-bottom: 10%;

}
.bg_set_new
{
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 7px;
  height: 12vh;
}

.bg_set_new_offers
{
  background-color: #FCC5ED;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  height: 7vh;  
}
  .bottom_card_inf
  {
 
  border-radius: 7px;
  color: #414141;
  size: 14px;
  background-color: white;
  margin-bottom: 10px
  }
  
  .bottom_card_inf11
  {
    position: relative;
    z-index: 15 !important;
  margin-top: -40px;
  width: auto;
  margin-bottom: 10px;
  margin-left: 8px;
  cursor: pointer;
  }
  .neg_stars_top
  {
    margin-top: -60px;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  

  .description_of_card
  {
    color: #414141;
    font-family: Poppins;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.01em;
    text-align: left;

  }
  .one_line_text_limit 
  {
    white-space: nowrap; 
  width: 150px; 
  overflow: hidden;
  text-overflow: ellipsis; 
  }

  .text_limit
  {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 2; 
    -webkit-box-orient: vertical;
  }
  .text_limit1
  {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
            line-clamp: 1; 
    -webkit-box-orient: vertical;
  }
  .text_limit2
  {
    max-height: 2.4em; /* Adjust the value as needed to fit two lines */
    line-height: 1.2em; /* Adjust the value to control the line height */
    overflow: hidden;
    text-overflow: ellipsis; /* Adds ellipsis if text overflows */
    white-space: nowrap; 
  }
  .check_padding
  {
    padding-top: 5% !important;
    padding-left: 2.5% !important;
    padding-right: 2.5% !important;
    box-shadow: none !important;
    margin-top: 6.5px;
  }
  

  .form-check-input:checked
  {
    background-color: white;
    border: 1px solid #FAC6C8 !important;
    color: red !important;
    
  }
  .form-check-input:checked[type=checkbox]
  {
    background-image: url(/imagess/check1.png) !important;
  }

.check_services_box
{
  accent-color: red;
}

  input[type="password"] {
    font-size: 30px;
  }
  
  .img_style_flag
  {
    border-radius: 50px !important;
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  .img_style_flag1
  {
    border-radius: 50px !important;
    width: 15px;
    height: 15px;
  }

  .font_style_flag
  {
    font-size: 12px;
    color: #444444;
    padding-left: 5px;
  }

  .backgroundsignup
  {
    background-color: #F8FAFC;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 80vh;
  }
  .icon_line
  {
    color: #444444;
    font-size: 12px;
  }
  

  .img_width_signup
{
  width: 70%;
}
.font_set_terms_conditions
{
  font-size: 12px;
  color: #454c55;
}
.padding_left_right {
  margin-top: 1%;
  padding-left: 10%;
  padding-right: 10%;
}
.padding_left_right1 {
  margin-top: 2%;
  padding-left: 5%;
  padding-right: 5%;
}
.font_set_terms_conditions1
{
  font-size: 12px;
  color: #757677;
}

.otp_code_react_input__lt1lr input
{
  background-color: 1px solid green !important;
  margin: 0.4rem !important;
  color: #9F9F9F !important;
  font-family: Roboto !important;
  font-size: 14px !important;
  width: 45px;
  height: 45px;
  text-align: center;
  padding-left: 0% !important;
  box-shadow: none  !important;
  background-color: white !important;
}

.otp_code_react_input__lt1lr input:hover
{
  background-color: 1px solid green !important;
  margin: 0.4rem !important;
  color: #9F9F9F !important;
  font-family: Roboto !important;
  font-size: 14px !important;
  width: 45px;
  height: 45px;
  text-align: center;
  padding-left: 0% !important;
  box-shadow: none  !important;
  background-color: white !important;
}

.otp_code_react_input__lt1lr input:focus
{
  margin: 0.4rem !important;
  color: #9F9F9F !important;
  font-family: Roboto !important;
  font-size: 14px !important;
  width: 45px;
  height: 45px;
  text-align: center;
  padding-left: 0% !important;
  background-color: white !important;
  box-shadow: none  !important;
}




.padding_apply_signup_terms
{
  // padding-top: 5%;
  // padding-left: 10%;
  // padding-right: 10%;
}

.padding_apply_signup_terms1
{
  padding-top: 2%;
  padding-left: 20%;
  padding-right: 20%;
}
.color_light_font
{
  color: lightgray;
}

  .bg_image_signup
  {
    background-image: url("https://1864597015.rsc.cdn77.org/newexpertpreprod/Images/LoginBg.png");
    background-size: cover;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    height: 80vh;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    object-fit: cover !important;
  }



  input{
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal; 
    color: #4a4a4a;
  }
  .react-tel-input .country-list .country{
    text-align:left;
  }
  img {
    max-width: 100%;
  }
  .react-tel-input .flag-dropdown { 
    background-color: #f1f6fa;
    border: 0px solid #cacaca;
    border-radius: 3px 0 0 3px;
  }
  .react-tel-input .form-control {
    background: #f1f6fa;
    border: 0px solid #CACACA;
    border-radius: 5px;
    line-height: 25px;
    height: 35px;
    width: 300px;
    outline: none;
    box-shadow: none !important;
  }
  .react-tel-input .form-control:focus {
    background: #f1f6fa;
    border: 0px solid #CACACA;
    border-radius: 5px;
    line-height: 25px;
    height: 35px;
    width: 300px;
    outline: none;
  }
  .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus {
    background-color: #f1f6fa;
   }
  .react-tel-input .flag-dropdown.open .selected-flag {
    background: #f1f6fa;
    border-radius: 3px 0 0 0;
  }

  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
     -webkit-appearance: none;
    margin: 0;  
}

.button_style_profile
{
  background-color: #DF1919;
  color: white;
  width: 40%;
  border-radius: 10px;
}

.button_style_profile:hover
{
  background-color: #DF1919;
  color: white;
  width: 40%;
  border-radius: 10px;
}

.header_nav_icons_width
{
  width: 9%;
}

.font_new_one_header
{
  font-family: Poppins;
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #f2a3a3;
  cursor: pointer;
}

.font_new_one_header1
{
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: white;
  cursor: pointer;
}

.logo_width_image
{
  width: 80%
}

.img_tag
{
  width: 50%;
}

.background_button_nav
{
  background-color: white;
  border-radius: 4px;
  border: solid 1px #eee;
}


.background_button_nav_lang
{
  background-color: white;
  border-radius: 4px;
  border: solid 0px #eee;
}

.background_button_nav_lang:hover
{
  background-color: white;
  border-radius: 4px;
  border: solid 0px #eee;
}

.fontcartlang
{
  color: #4a4a4a;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}


.fontcart
{
  font-size: 15px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

.sidebar_style
{
  display: block,
  margin: auto,
  width: 35%,
}

.background_color_sidebar
{
  background-color:#DB0406;
  color: white;
  border-radius: 8px;
  cursor: pointer
}

.background_color_sidebar_one
{
  background-color: white;
  color: rgb(74, 74, 74);
  border-radius: 8px;
  cursor: pointer
}
.image_icon_width
{
  width: 10%
}

.border_profile
{
  border: solid 1px #f1f6fa; 
}

.subheading_profile
{
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  text-align: left;
  font-style: normal;
  color: #ccd2d8;
}



.login_text_profile
{
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}


.border_for_all_pages_new
{
  padding: 8px 7px 8px 8px;
  border-radius: 8px;
  border: solid 0.8px #e7eaec;
  background-color: white;
}

.border_for_all_pages
{
  padding: 15px 15px 15px 15px;
  border-radius: 8px;
  border: solid 0.8px #e7eaec;
  background-color: white;
}
.border_for_all_pages1
{
  padding: 15px 15px 15px 15px;
  border-radius: 8px;
  border: solid 0.8px #e7eaec;
  background-color: white;
}
.basic_text
{
  font-family: Roboto;
  font-size: 15px;
  font-weight: regular;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #aaa;
}

.text_for_all_selection
{
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000;
}

.basic_text1
{
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  color: #ccd2d8;
}

.right_icon_style
{
  width: 1.5%
}

.basic_text2
{
  color: black;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
}

.subheading_profile_switch
{
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #b1b4b7;
  
}

.heading_name_profile
{
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #000;
}

.incorrect_format
{
  font-size: 70%;
  color: red;
}
.correct_format
{
  font-size: 70%;
  color: green;
}

// .total_height_dashboard
// {
//   height: 100vh;
// }
.img_width_verified
{
  width: 10%;
}
.font_exp
{
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.heart_icon
{
  width: 4.5%
}

.guest_option
{
  color: #ccd2d8;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}
.style_a_tag11
{
  text-decoration: none;
}
.style_a_tag11::hover
{
  text-decoration: none;
}

.style_a_tag
{
  text-decoration: none;
  color: rgb(74, 74, 74)
}
.style_a_tag:hover
{
  text-decoration: none;
  color: rgb(74, 74, 74)
}

.guest_hello
{
  color: #fff;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

.height_of_edit_screens
{
  height: 100vh;
}

.css-1d3z3hw-MuiOutlinedInput-notchedOutline
{
  border-radius: 10px !important
}

.img_ava
{
  width: 75%;
}

.img_ava1
{
 width: 50px;
 height: 50px;
 box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.16);
}

.text_icon_all
{
  font-size: 100%;
  font-weight: 500;
  color: black;
}

.img_width_all_icons
{
  width: 10%
}

.text-color-black
{
  color: black;
}

.color_email
{
  color: lightgray;
}

.downn
{
  width: 2%;
}



#dropdown-basic
{
  width: 100%;
  text-align: left !important;
  background-color: white;
}

.display_but
{
  display: flex;
  flex-direction: row;
}
#dropdown-basic:focus
{
  width: 100%;
  text-align: left !important;
  background-color: white;
}

.guest
{
  color: #bbb;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

.loginreg
{
  color: #4a4a4a;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
}

.img_avatar
{
  width: 20%
}

#dropdown-basic::after
{
 display: none;
}

#dropdown-basicc
{
  padding: 0px;
}

#dropdown-basicc::after
{
 display: none;
}

.border_left_new
{
  border-left: solid 1px #eee;
}

.img_cart
{
  width: 30%
}
.padding_custom_industries
{
  padding-left: 7%;
}
.img_globe
{
  width: 50%
}

.input_form_search
{
  background-color: #f1f6fa;
  border: none;
}
.input_form_search:focus
{
  background-color: #f1f6fa;
  border: none;
  box-shadow: none;
  outline: none;
}

.background_color_navigation_one
{
  background-color: #db0406;
}

.background_color_navigation_two
{
  background-color: #D10000;
  box-shadow: 0 4px 2px -2px lightgray;
}

.background_color_navigation_two_mob
{
  background-color: #E90000; 
}

.background_color_navigation_two1
{
  background-color: #D10000;
  box-shadow: 0 4px 2px -2px lightgray;
  position: absolute;
  z-index: 100000;
  width: 100%;
  top: 0px;
  overflow-y: auto;
}

.header_bottom
{
  padding-bottom: 10px;
}
.mobile_img_adj
{
  border-radius: 50%;
  width: 80px;
  height: 75px;
}
.color_text_mobile
{
  color: #818181;
  font-size: 14px;
}

.color_text_mobile_black
{
  color: black;
  font-size: 16px;
}

.btn_style_light_new
{
  color: #666 !important;
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}
.btn_style_light_new_bor
{
  border-radius: 7px;
border: 1.5px solid #D7D7D7;
  color: #000;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 500;
}



input[type=number] {
    -moz-appearance:textfield;  
}

.background_line
{
  background-color: #EAEAEA;
  border: 1px solid #EAEAEA;
}
.navigation_mobile
{
  display: none;
}

.email_font_screen
{
  font-size: 80%;
}

.email_font_screen_sub
{
  color: lightgray;
  font-size: 70%;
}

.recovery_text_red
{
  font-size: 70%;
  color: red;
  cursor: pointer;
}

.a_style
{
  text-decoration: none;
}

.text_des_email
{
  font-size: 70%;
  color: lightgray;
}

.text_style_profile
{
  color: #DB0406;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
}

.mobile_responsive_navigation
{
  display: none;
}

//////////////////////////Anas

input[type="file"] {
  display: none;
}
.display_file_upload
{
  // margin-top:10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2px;
  padding-top: 2px;
  background: rgb(251, 228, 228); 
  border-radius: 5px;
  color: red;
  font-size: 80%;
  
}
.display_file_upload1
{
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2px;
  padding-top: 25px;
  padding-bottom: 45px;
  display: table;
  border-radius: 10px;
  color: red;
  font-size: 80%;
  width: 100%;
  height: 100%;
  border: 1px solid lightgray;
  
}

.justify_con
{
  display: flex;
    flex-direction: row;
    justify-content: end;
}

.audio_setting
{
  width: 100%;
  border-radius: 0 !important;
 
}

.img_width_bannerg
{
  width: 30%;
}

.btn_style_light
{
  background-color: white;
  border: 1px solid lightgray;
}

.img_fix_banner
{
  height: 60vh;
  border-radius: 10px;
}

.img_width_setting
{
  height: 25vh;
  width: 30vw;
  border-radius: 10px;
}

.icon_red_upload_cloud
{
  font-size: 260%;
  color: #ccd2d8;
}

  }

  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
     -webkit-appearance: none;
    margin: 0;  
}

input[type=number] {
    -moz-appearance:textfield;  
}
.width_img
{
  width:400%;
}
.border_cards
{
  border: 1px solid lightgray;
  border-radius: 5px;
}

video {
  width: 100% !important;
  height: 100%;
  object-fit: fill;
  z-index: 0;
  border-radius: 10px;
}

.video-container
{
  height: 80vh;
    width: 100%;
    object-fit: fill;
}

.right_margin
{
  left: auto;
}
.display_flexx
{
  flex-direction: row;
  display: flex;
  justify-content: space-evenly;

}

.catagories_width
{
  width: 10%;
}

.border_container
{
  border: 1px solid lightgray;
  border-radius: 10px;
}

.heading_color
{
  color: #444;
  font-size: 80%
}

.img_width_packages
{
  width: 70%;
}
.font_size_2
{
  font-size: 12px;
  color: #ccd2d8;
}

.font_size_4
{
  font-size: 14px;
}

.poly_width
{
  width: 30%;
}

.position_top
{
  margin-top: -28px;
  font-size: 12px;
  color: white;
}
.save_text
{
  font-size: 6px;
}

.border_right
{
  border-right: 1px solid lightgray
}

.text_300
{
  font-size: 8px;
}

.bcakground_color_card
{
  border-radius: 8px;
  background-color: #f5f5f5;
}

.save_text1
{
  color: #292929;
  font-size: 13px;
  font-weight: 600;
}

.get_now_text1
{
  font-size: 12px;
}

.main_heading_service
{
  font-size: 16px;
  font-weight: 600;
  color: #444;
}

.sub_heading_service
{
  font-size: 14px;
  color: #6c6c6c;
}

ul {
  padding-left: 1rem;
}

.font_ul
{
  font-size: 14px;
  color: #4a4a4a;
}

.font_size_3
{
  font-size: 16px;
  color: #444;
}

.display_flexx_services
{
  flex-direction: row;
  display: flex;
  justify-content: space-evenly;
}

.img_width_ind
{
  border-radius: 10px;
  padding: 5px;
  cursor: pointer;
}

.box_width
{
  width: 10%;
}

.border_card_ind
{
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
}

.cursor_back
{
  cursor: pointer;
}


new code css -----------------------------------------------------------------------------------------------------------------------------------
.catagories_width
{
  padding-top: 1%;
  padding-bottom: 1%;
}


.img_border
{
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  height: 30vh;
  width: 100%;
}
.img_border1
{
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  height: 151px;
  width: 100%;
}
.title_text_services
{
  font-family: Roboto;
  font-size: 12px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: normal;
  text-align: left;
  color: #2b2b2b;

}
.title_text_services1
{
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: normal;
  color: #2b2b2b;

}
.title_text_services2
{
  font-family: Roboto;
  font-size: 10px;
  font-weight: 400;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  text-align: left;
  color: #B1B4B7;
  line-height: 12px;
}
.flex_using
{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.add_button
{
  background-color: #D61614;
  color: white !important;
  font-size: 10px;
  width: 24px;
  height: 24px;
  text-align: center;
  border-radius: 5px;
  padding-top: 4.5px;
  cursor: pointer;
}

.custom_padding_services_pages
{
  padding-left: 6%;
  padding-right: 6%;
  padding-top: 1.5%;
}
.border_of_youtube
{
  border-radius: 15px;
  border: 1px solid gray;

}
.shadow_youtube
{
  box-shadow: 1px 1px 3px 3px lightgray;
}

.text_change_service
{
  font-size: 120%;
  color: black;
  weight: 550;
}

.circle_rad
{
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.cursor_property
{
  cursor: pointer;
  border-radius: 8px;
  border: solid 1px #dcdcdc !important;
  margin-bottom: 15px;
}

.sub_text_para
{
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  color: #aaa;
}

.color_danger
{
  background-color: #EC1E27 !important;
}

.back_light_button
{
  background-color: rgb(170, 170, 170) !important;
  padding-top: 0.1%;
  padding-bottom: 0.1%;
}
.back_light_button1
{
  background-color: rgb(170, 170, 170) !important;
  padding-top: 0.1%;
  padding-bottom: 0.1%;
  padding-left: 3.2%;
  padding-right: 3.2%;
}

.text_show
{
  font-size: 13px;
  color: #000;
  font-family: Roboto;
  font-weight: 400;
  background-color: #F8FAFC;
}
.loading_giff
{
  width: 15%; 
}
.bg_hr_line
{
  border: solid 0.8px #dcdcdc;
  margin-top: 8px;
  margin-bottom: 8px;
}
.provider_summmary_des
{
  font-size: 14x;
  line-height: 40px;
  color: #000000;
  font-family: Roboto;
}
.provider_summmary_des1
{
  font-size: 14px;
  color: #000;
  font-family: Roboto;
  font-style: normal;
}
.label_text
{
  font-size: 10px;
  color: rgb(184, 184, 184);
  padding-bottom: 1px;
}
.description_text
{
  font-family: Roboto;
  font-size: 14px;
  color: #000000;
}

.search_new
{
  color: #aaa;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
}

.border_newwww
{
  border-radius: 8px !important;
  border: solid 0.8px #dcdcdc !important;
  padding-left: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-right: 15px;
}

.border_rad_notes
{
  border-radius: 10px;
  border: 1px solid lightgray;
}


.css-i4bv87-MuiSvgIcon-root
{
  color: red !important;
  border-radius: 100px !important;
  padding: 1px !important;
}
.Calendar 
{
  width: 100%;
}
.Calendar__day.-selected, .Calendar__day.-selectedStart, .Calendar__day.-selectedEnd
{
  border-radius: 5px !important;
}
.Calendar__day.-selected, .Calendar__day.-selectedStart, .Calendar__day.-selectedEnd:hover
{
  border-radius: 5px !important;
}

.new_height
{
  height: 48vh;
  overflow-y: scroll;
  border-radius: 10px;
}
.new_height1
{
  height: 20vh;
  overflow-y: scroll;
  overflow-x: hidden;
  border-radius: 10px;
}

.fonts_slots
{
  color: #383838;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 400;

}

.fonts_slots_active
{
  color: white;

font-family: Roboto;
font-size: 14px;
font-style: normal;
font-weight: 600;

}

.img-sizig
{
  width: 50px;
  height: 50px;
  border-radius: 50px;
}

.card_design_provider{
  border-radius: 10px;
  border: 1px solid lightgray;
  background-color: white;
}

.font_one_p
{
  color: #000;
  font-family: Roboto;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
}
.font_one_p_new
{
  color: #AAA;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
}


#new_star
{
  font-size: 60%;
  color: rgb(255,152,0);
}

.font_small_p
{
  font-size: 70%;
  color: gray;
}

.color_distance
{
  color: gray;
  font-size: 85%;
}
.color_drop
{
  font-size: 90% !important;
}

.bg_color_white_thankyou
{
  background-color: white;
  border: 0.8px solid lightgray;
  margin-bottom: 20px;
  border-radius: 10px;
}

.button_thnakyou
{
  background-color: #EC1E27 !important;
}




...........................code for navigation

.overflow_main_dashboard {
  overflow-x: hidden !important;
  background-color: #F8FAFC;
}

.side_nav_main_1 {
  height: 100vh;
  /* width: 40px !important; */
  background-color: white;
  cursor: pointer;
  box-shadow: 5px 0 9px -2px #88888823;
  position: relative;
  z-index: 111;
}

.height_fiz_menu_active {
  height: 4%;
  background-color: rgb(253, 229, 229);
  border-radius: 10px;
  color: rgb(233, 0, 0);
  margin-top: 50%;
}

.height_fiz_menu {
  margin-top: 50%;
  color: rgb(170, 170, 170);
}

.height_fiz_menu1 {
  padding-top: 20%;
  font-size: 140%;
  color: rgb(170, 170, 170);
}

.nav_news
{
  width: 3%,
  textAlign: center,
  backgroundColor: white,
  boxShadow: 5px 0 9px -2px #88888823,
  cursor: pointer,
  height: 100vh,
  position: "relative",
}

.padding_balance
{
  padding-top: 0.8%;
}

.input_width
{
  width: 100% !important; 
  border: none;
  height: 5vh !important;
 
}


.input_width::placeholder
{
  color: lightgray !important;
}

.img_height_width_profile
{
  height: 30px;
  width: 30px;
  border-radius: 50px;
  object-fit: cover;
}

.text_user_profile
{
  font-size: 70%;
  color: white;
}

.width_row_header
{
  width: 80%;
}

.border_right
{
  border-right: 0px solid #EDEDED !important;
}

.login_signup
{
  text-decoration: none;
  color: white;
}

.login_signup:hover
{
  text-decoration: none;
  color: white;
}

/////////////////////////
.main_outer_div
{
  background-color: white;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 6px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.111);
  height: 100%;
  position: relative;
  z-index: 1000;
}

.link_icon_style
{
  text-decoration: none;
  color: gray;
}

.overflow_scrool_dash
{
  overflow-y: hidden !important;
}

.scrool_hide::-webkit-scrollbar
{
display: none;
}

.custom_bottom_all_pages
{
  height: 80vh;
  overflow-y: scroll;
}

.custom_bottom_all_pages::-webkit-scrollbar
{
  display: none;
}

.children_overflow
{
  overflow-x: hidden !important;
  background-color: #f8fafc;
  position: relative;
  z-index: 600;
}
.children_overflow::-webkit-scrollbar
{
    display: none;
}

.address_label
{
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #aaa;
}
#edit_icon
{
  color: lightgray;
  font-size: 80%;
}
.img_set_users
{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.main_heading_text
{
  font-family: Roboto;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.14;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}
.main_heading_text1
{
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  text-align: left;
  color: #6c6c6c;
}
.main_heading_text2
{
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.6;
  letter-spacing: normal;
  text-align: left;
  color: #b1b4b7;
}
.main_heading_text3
{
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  color: #aaa;
}

.address_label_des
{
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}

.label_text_profile
{
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #aaa;
}

.input_profile_all
{
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}

.input_profile_all_address
{
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #191919;
}

.input_profile_all_dob
{
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}

.non_active
{
  color: rgb(170, 170, 170) !important;
}



/////////////////////////Anas


.search_map
{
  top: 1rem;
  left: 1rem;
  z-index: 900;
  width: 100%;
}
.display_mob
  {
    display: none;
  }

  .hide_onpc
  {
    display:none;
  }
.positon_relative_sett
{
  position: relative;
  z-index: 122;
}
.position_set_icons_dots
{
  position: absolute;
  z-index: 123;
  top: 70px;
  left: 310px;
}
.button_size_fixed
{
  margin-top: 30%;
}
.button_size_fixed1
{
  margin-top: 30%;
}
.button_for_email_page
{
  margin-top: 20%;
}
.font_normal_email_fields
{
  font-size: 14px;
  color: black;
}
.verify_now
{
  font-size: 12px;
}
.button_size_fixed2
{
  margin-top: 10%;
}
.text_alignment_user_detail
{
  text-align: right;
}
.d_flex_expert_address
{
   display: flex;
   flex-direction: row;
}
.img_width_set_1
{
  width: 40%;
}
.padding_set_left_provider
{
  display: flex;
  flex-direction: row;
  padding-left: 20px !important;
}
.padding_set_left_provider2
{
  padding-left: 30px !important;
}
.error_text
{
  font-size: 10px;
  color: red;
}
.padding_set_left_provider3
{
  padding-right: 30px !important;
}
.padding_top_new_button
  {
    margin-top: 20%;
  }
  .margin_bottom_new
  {
   
    overflow-x: hidden;
    margin-bottom: 2%;
    padding-left: 22%;
    padding-right: 22%;
  }

  .margin_bottom_new::-webkit-scrollbar
  {
    display: none;
  }
  .heromob
  {
    display: none;
  }
  .pdding_right_offers
  {
    padding-right: 10px;
  }
  .pdding_right_offers1
  {
    padding-right: 30px;
  }
  .position_of_font
  {
   padding-bottom: 20px;
  }
  .title_trending
  {
    color: #414141;
font-family: Poppins;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 95.523%; /* 13.373px */
letter-spacing: 0.14px;
text-transform: uppercase;
  }
 
  .coming_soon_img
  {
    width: 20%;
    padding-top: 10%;
  }
  @media only screen and (max-width: 1366px) {
  .screen_check_query
  {
  display:none;
  }
  .background_color_sec_1
  {
    background-color: #D0D9E0;
    height: auto;
  }
}

@media only screen and (max-width: 1024px) {
  .on_pc_screen_ipad
  {
    display: none;
  }
  .height_ipad_services
  {
    height: 15vh;
  }
}

@media only screen and (max-width: 373px) {
.footer_images
{
  width: 40px;
  height: 40px;
}
}


@media only screen and (max-width: 850px) {
  .background_color_sec_22
  {
    background-image: url(/imagess/backgroundcontent.png);
    height: auto;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .custom_padding_services_pages
  {
    padding-left: 6%;
    padding-right: 6%;
    padding-top: 5%;
  }
  .img_align_end
  {
    text-align: center;
  }
  .img_align_center
  {
    text-align: center;
  }
  .img_align_start
  {
    text-align: center;
  }
  .strong_tag
  {
    font-size: 28px; 
    color: rgb(51, 51, 51);
  }
  .drop_down_signup
  {
    background-color: #FFFFFF;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .skleton_landing
  {
    width: 55px !important;
    height: 55px !important;
    margin-left: 10% !important;
    margin-top: 10px !important;
  }
  .skleton_landing_typ
  {
    width: 95% !important;
    margin-left: 5% !important;
    margin-top: 5px !important;
  }
  .background_footer
  {
    background-color: #EBEBEB;
    padding-left: 5%;
    padding-Right: 5%;
  }
  .fae--textt
  {
    font-size: 15px;
  }
  .fae--text {
    font-size: 11px;
}
  .coming_soon_img
  {
    width: 40%;
    padding-top: 70%;
  }
  body::-webkit-scrollbar
  {
    display: none;
  }
  .display_banner
  {
    height: auto;
    width: 100%;
  }
  .height_width_landing_ind
  {
    height: 43px;
    width: 43px;
    object-fit: cover;
    border-radius: 50px;
  }
  .padding_apply_signup_terms1
  {
    padding-top: 30%;
    padding-left: 20%;
    padding-right: 20%;
  }
  .img_border1
{
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  height: auto;
  width: 100%;
}
  .custom_padding1
  {
    padding-left: 2%;
    padding-right: 2%;
  }
  .ixPsiy{
    padding: 0px !important;
  }
  .profl_color_page
  {
    background-color: white;
  }
  .position_of_font
  {
    margin-top: 20%;
    bottom: 20px;
    left: 15px;
  }
  .border_for_all_pages
  {
    overflow: hidden;
  }
  .card_placeholder1
  {
    width: 100%;
    border-radius: 0px;
    box-shadow: none !important; 
    outline: none !important;
  }
  .dropdown_search_text
  {
    list-style-type: none;
    background-color: white;
    color: black;
    width: 100%;
    margin-left: 0rem;
    max-height: 35vh;
    overflow-y: auto;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    padding-left: 0px;
  }

  // for filee---------------------------------------------------------------
  section {
    margin: 20px;
  }
  
  #upload::-webkit-file-upload-button {
    position: absolute;
    padding: 10px 10px;
    background-color: #DC0000;
    border: none;
    border-radius: 5px;
    color: white;
    box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    transition: 100ms ease-out;
    cursor: pointer;
  }
  
  #upload::-webkit-file-upload-button:hover {
    background-color: #bd6e1f;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)
  }

  // for filee-----------------------------------------------------------------
.payment_page_text
{
  font-size: 16px;
}
  .border_rouned_payment
  {
    border-radius: 10px;
  }
  input[type="file"] {
    display: block;
  }
  .font_one_p1
{
  color: #6C6C6C;
  font-family: Roboto;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
}
.font_one_p2
{
  font-size: 12px;
  color: rgb(178,178,178); 
}
  .img-sizig
{
  width: auto;
  height: auto;
  border-radius: 50px;
}

  .color_drop
{
  font-size: 12px !important;
}
  .color_distance
{
  color: gray;
  font-size: 75%;
}
  .font-size-24
  {
    color: rgb(180, 177, 177);
  }
  .provider_summmary_des1
{
  font-size: 13px;
  color: #000000;
  font-family: Roboto;
}
  .back_light_button1
  {
    background-color: rgb(170, 170, 170) !important;
    padding-top: 0.1%;
    padding-bottom: 0.1%;
    padding-left: 4.8%;
    padding-right: 4.8%;
  }
  .card_serices_by_industry_id
{
  overflow-y: hidden;
  background-color:  rgba(255, 255, 255, 0) !important;
  border-radius: 8px;
  border: solid 0px #dcdcdc;
  }
  .title_text_services
{
  font-family: Roboto;
  font-size: 14px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: normal;
  text-align: left;
  color: #2b2b2b;

}

  .img_border
{
  border-radius: 10px !important;
  height: auto;
  width: 100%;
}

  
  .position_main_container
  {
   position: relative;
   z-index: 111;
   overflow-y: hidden;
   overflow-x: hidden;
   height: 25vh;
   margin-bottom: 100px;
  }
  .img_width_monitor
  {
    width: 100%;
  }
  .points_content_detail_page
  {
    line-height: 150%;
    color: #565656;
    font-size: 14px;
  }
  .img_width_mobile
  {
    width: 95%;
  }
  .p_tag_service1
  {
    font-size: 16px;
  }
  .custom_padding_contentpage1
  {
    padding-left: 5%;
    padding-right: 5%;
  }
  
  .main_headingg_new
  {
    font-size: 20px;
  }
  .background_color_button
{
  background: #dc0000;
  color: #fff;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 40px;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
}
  .width_img_contet
  {
    padding-top: 15%;
    width: 100%;
  }
  .mobile_screen_display
  {
    display: block;
  }
  .button_for_pos{
    cursor: pointer;
    width: 12%;
  }
  .background_grid_auth
{
  background-color: white !important;
}
  .new_screen_position2
  {
    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.05);
    position: absolute;
    z-index: 9999;
    width: 90%;
    height: 20vh;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .img_adjust_mob_all_services
  {
    height: 404px;
    object-fit: cover;
    border-radius: 12px;
    width: 100% !important;
    
  }
  .card_heading_text2
{
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  color: #9D9D9D;

}
  .img_height_width_set
  {
    height: 186px !important;
    border-radius: 20px;
    width: 100%;
  }
  .title_trending
  {
    color: #414141;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 95.523%; /* 13.373px */
    letter-spacing: 0.14px;
    text-transform: uppercase;
  }
  .bg_card_ground
  {
   
    height: auto;
    border-radius: 7px !important;
   position: relative;
   z-index: 10;
   box-shadow: rgba(204, 204, 204, 0.247) 0px 0px 50px;
   
  }
 
  .card_heading_text
    {
      font-family: Poppins;
    font-size: 14px;
    font-weight: 500 !important;
    line-height: 13px;
    letter-spacing: 0em;
    text-align: left;
    color: #1E1E1E;
    white-space: nowrap; 
    width: 150px; 
    overflow: hidden;
    text-overflow: ellipsis; 
    }
  .img_positioning_pfu
  {
    position: relative;
    z-index: 11;
    height: 260px;
    width: 170px;
    object-fit: cover;
    border-radius: 10px;
  }

  .img_newww
  {
    position: relative;
    z-index: 11;
    height: 460px;
    width: 100%;
    object-fit: cover;
    border-radius: 10px !important;
  }
  
  .using_flex
{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
  .img_mob
  {
    height: 50vh;
  }
  .margin_top_buttton
  {
    margin-top: 10%;
  }
  .img_height_set
  {
    height: auto;
  }
  .padding_for_mob_new
  {
    padding-bottom: 120%;
  }
  .on_pc_screeen
  {
    display: none;
  }
  .background_color_sec_1
  {
    background-color: #D0D9E0;
    height: auto;
  }
  .heromob
  {
    display: block;
  }
  .main_landing_mob
  {
    height: 100vh;
    overflow-y: scroll;
    padding-bottom: 100%;
  }
  .card_width_further
{
  border-radius: 15px;
  background-position: center;
  background-repeat: no-repeat;
  background-size:100% 100%;
  height: 250px;
  width: 150%;
  position: relative;
}





.card_width_further1
{
  background-image: url(/imagess/maskgirl.png);
  border-radius: 15px;
  background-position: center;
  background-repeat: no-repeat;
  background-size:100% 100%;
  height: 150px;
  width: 100%;
  position: relative;
}

  .margin_bottom_new
  {
    margin-bottom: 2%;
    overflow-y: scroll;
    height: auto;
    overflow-x: hidden;
    padding-left: 6%;
    padding-right: 6%;
  }
  
  .border_of_selected_services
  {
    font-family: Roboto;
    font-size: 10px;
    margin-top: 10px;
    margin-left: 10px;
  }
  .text_alignment_user_detail
{
  text-align: left;
  padding-top: 4px;
}
  .img_height_width_userdetail2
  {
    height: 50px;
    width: 50px;
  }
  .img_height_width_userdetail
  {
    height: 90px;
    width: 90px;
  }
  .flex_direction_detail_page
  {
    display: flex;
    flex-direction: row;
  }
  
  .button_size_fixed2
{
  margin-top: 100%;
}
  .react-calendar {
    height: auto !important;
    width: 100% !important;
    border-radius: 8px !important;
    border: 1px solid lightgray !important;
  }
  .button_size_fixed1
  {
    margin-top: 180%;
  }
  .font_normal_email_fields
{
  font-size: 12px;
  color: black;
}
  .button_for_email_page
{
  margin-top: 140%;
}
  .button_size_fixed
{
  margin-top: 20%;
}
  .profile_cards
{
  padding: 16px 9px 3px 9px;
  border-radius: 8px;
  border: solid 0.8px #dcdcdc;
  background-color: white;
  font-family: Roboto;
  font-size: 10px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #000;
  height: 9vh;
}
.icon_size_cards_in_mobile
{
  width: 25px;
  height: 25px;
}
  .img_mobile_cam
  {
    position: absolute;
    top: 80px;
    right: 290px;
    width: 4%;
  }
  
  .hide_onpc
  {
    display: block;
  }
 
.subheading_profile
{
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
    text-align: center;
  color: #ccd2d8;
}
  .border_for_all_pages1
  {
    display: none;
  }
  .img_profile_mobile_setting
  {
    width: 104px;
    height: 104px;
    border-radius: 50%;
  }
  .margin_top_negg
{
  margin-top: -120px;
  position: relative;
  z-index: 11;
  padding-bottom: 30px;

}
  .img_height_width_set
  {
    height: auto;
    border-radius: 20px;
  }
  .display_pc
  {
    display: none;
  }
  .display_mob
  {
    display: block;
  }
 
  .justify_flex
  {
    justify-content: left;
  }
  
  .width_add_buttons
  {
    width: 50px;
  }
  .cards1 {
    background-color: white;
    border: 2px solid rgb(239, 240, 241);
    width: 100%;
    border-radius: 8px;
    padding-top: 5%;
    padding-bottom: 5%;
    margin-top: 1%;
    text-align: center;
  }
  .img_width_cards {
    width: 10%;
  }
  .flex_of_cards {
    display: flex;
    flex-direction: column; 
    width: 100%;
  }
  .text_center_for_mob
  {
    text-align: center;
  }
  .padding_left_right {
    margin-top: 1%;
    padding-left: 3%;
    padding-right: 3%;
  }
  .london_text_sub1 {
    position: relative;
    bottom: 0px;
    right: 15px;
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #6c6c6c;
  }
  .fix_height_bookings
  {
    height: 75vh;
    overflow-y: scroll;
    padding-bottom: 100px;
    padding-left: 3%;
    padding-right: 3%;
  }
  .display_none_on_mobile
  {
    display: none;
  }
  .img_logo_mobile_size
  {
    width: 22px;
    height: 24px;
  }
  .border_white_mobile_navigaton
  {
    border: 0.7px solid #F1F3F4;
    background-color: #F1F3F4;
    border-radius: 10px;
  }
  .map_styles
{
  width: 100%;
  margin-top: 1rem;
  border-radius: 1rem;
}
.search_map
{
  top: 1rem;
  left: 0rem;
  z-index: 1000;
  width: 100%;
}
.custom_bottom_all_pages
{
  height: 70vh;
  overflow-y: scroll;
}
.new_icon_role
  {
    width: 14%;
  }
  .font_inner_icon_services
  {
    width: 6%;
  }
  .margin_set_bottom
  {
    margin-bottom: 200%;
  }
 

}


@media(max-width:380px){
  .react-tel-input .form-control { 
     width: 228px !important; 
  }
  .react-tel-input {
      width: 100% !important;  
      padding: 10.9px 21px 13px 15px !important;  
  }
}

@media only screen and (max-width: 600px) {

  .img_mobile_cam {
    position: absolute;
    top: 80px;
    right: 130px;
    width: 7%;
}
.button_size_fixed {
  margin-top: 150%;
}
.position_of_font {
  margin-top: 20%;
}
.position_main_container
  {
   position: relative;
   z-index: 111;
   overflow-y: hidden;
   overflow-x: hidden;
   height: 33vh;
   margin-bottom: 100px;
  }
  

}

@media only screen and (max-width: 850px) {
  .my_video
  {
    width: 85% !important;
    margin-top: 10px;
    margin-left: 2px;
  }
  .img_width_monitor
  {
    width: 90%;
  }
}

@media only screen and (max-width: 850px) {
  .display_flex_booking_detail
  {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  .with_detail_card
  {
    border-radius: 10px;
    border: 0.5px solid #DCDCDC;
    background: #FFF;
    width: 100px;
    height: 100px;
    box-shadow:
  0 2.8px 2.2px rgba(162, 162, 162, 0.080),
  0 6.7px 5.3px rgba(162, 162, 162, 0.080),
  0 12.5px 10px rgba(162, 162, 162, 0.080),
  0 22.3px 17.9px rgba(162, 162, 162, 0.080),
  0 41.8px 33.4px rgba(162, 162, 162, 0.080),
  0 100px 80px rgba(162, 162, 162, 0.080)
  }
  .position_set_icons_dots {
    position: absolute;
    z-index: 123;
    top: 70px;
    left: 0px;
}
  .flex_of_cards {
    display: flex;
    flex-direction: row; 
    width: 100%;
  }
  .width_coloumn
  {
    width: 40%;
  }
  .navigation_mobile
{
  display: block;
}
.mobile_responsive_navigation
{
  display: block;
}

  .logo_width_image_mobile
  {
    width: 35%;
  }
  .navigation_pc
  {
    display: none;
  }
  .side_nav_hide
  {
    display: none;
  }
 .bg_image_signup
  {
    display: none;
  }
  .backgroundsignup
  {
    background-color: white !important;
    border-radius: 10px;
    margin-top: 30px;
  }




}


.css-1db085k-MuiSvgIcon-root{
  color:grey !important;
  background-color: white !important;
  border-radius: 100px !important;
  padding: 4px !important;
}
 .rbc-row-content {
  display: none !important;
}
/*.rbc-btn-group{
  display: none !important;
} */
.rbc-toolbar-label{
  font-weight: 600;
  text-align: start;
  padding: 2;
  color: #5599FF;
}
.rbc-time-view{
  border: none !important;
}
.rbc-time-header-content{
  border: none !important;
}
.rbc-time-header-content > .rbc-row.rbc-row-resource{
  border-bottom: 0 !important;

}
.rbc-time-content >  +  > *{
  border-left: 0 !important;
}
/* .rbc-toolbar{
  display: none !important;
} */
.rbc-timeslot-group{
  min-height: 100px !important;
}
.rbc-time-slot{
  height: 100%;

}
.rbc-event{
  border:4px solid white !important;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.rbc-label{
  display: flex;
  text-align: center !important;
  min-width: 85px !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  margin-top: -7px !important;
}
.rbc-events-container{
  min-width: 285px !important;
  margin-right: 2px !important;
  border-right:0.2px solid #666666 !important
}
.rbc-header{
  height: auto !important;
  color: #5599FF;
  font-size: 20px !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
}
.rbc-event-label{
  font-weight: 700;
  display: none !important;
}
.rbc-event{
  font-weight: 600;
}
.rbc-time-view-resources .rbc-header, .rbc-time-view-resources .rbc-day-bg{
  width: 285px !important;
}
.rbc-time-content > .rbc-day-slot{
  min-width: 285px !important;
}

.rbc-time-content::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
	border-radius: 10px;
}

.rbc-time-content::-webkit-scrollbar
{
	width: 10px;
	background-color: #F5F5F5;
}
.rbc-time-content::-webkit-scrollbar-thumb
{
	background-color: #5599FF;
	border-radius: 10px;
	/* background-image: -webkit-linear-gradient(0deg,
	                                          rgba(255, 255, 255, 0.8) 25%,
											  transparent 25%,
											  transparent 50%,
											  rgba(255, 255, 255, 0.8) 50%,
											  rgba(255, 255, 255, 0.8) 75%,
											  transparent 75%,
											  transparent) */
}
.rbc-today{
background-color: transparent !important;
}
.react-datepicker-wrapper{
  width: 40px !important;
  margin-left:-40px !important
}
.react-datepicker__input-container input{

  text-align: center !important;
}
.css-1t1j96h-MuiPaper-root-MuiDialog-paper{
width: 100% !important;
}
.react-datepicker__triangle{
  left: 40px !important;
}
.rbc-toolbar button{
  border: none !important;
font-weight: 500 !important;
}
.rbc-active{
  background-color: #5599FF !important;
  color: white !important;
}
.rbc-btn-group button:hover{
  background-color: rgb(107, 107, 107);
}
.react-datepicker-popper{
  z-index: 99 !important;
  inset:0px auto auto -51px !important
}
.rbc-month-view {
  height: 100vh !important;
}
.rbc-current-time-indicator{
  background-color: #ffffff !important;
  border: 1px solid #FE0000 !important;
  border-radius: 100px ;
  z-index: 99999999999999 !important;
}
.css-bdhsul-MuiTypography-root-MuiDialogTitle-root{
  padding: 0 !important;
}
.css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected{
  color: #5599FF !important;
}
.css-1aquho2-MuiTabs-indicator{
  background-color: #5599FF !important;
}
.css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon{
  display: none !important;
}
.css-74e2me-MuiInputBase-root-MuiInput-root-MuiSelect-root:before{
  border: none !important;
}
.css-13xfq8m-MuiTabPanel-root{
  padding: 0px !important;
}
.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input{
  display: flex;
  align-items: center;
}
.css-19khbc0-MuiInputBase-root-MuiInput-root-MuiSelect-root:before{
  display: none !important;
}
/* .css-l4u8b9-MuiInputBase-root-MuiInput-root:before{
  display: none !important;
} */
.rbc-time-header.rbc-overflowing{
  border: none !important;
}
.rbc-time-view-resources .rbc-time-gutter, .rbc-time-view-resources .rbc-time-header-gutter{
  border: none !important;
}
.rbc-time-content{
  border: none !important;
}
.rbc-time-content > .rbc-time-gutter{
  border-right: 1px solid #ddd !important ;
}
.rbc-event{
  border-radius: 12px !important;
}
.rbc-timeslot-group{
  border: none !important;
}
.rbc-day-slot .rbc-time-slot{
  border-top:1px solid  #e3e3e3 !important;
}
.react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::after{
  display: none !important;
}
.react-datepicker-popper[data-placement^=bottom] .react-datepicker__triangle::before{
  display: none !important;
}

  .pt1 {
     background-color: #343a40 !important;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%239C92AC' fill-opacity='0.25' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to right top, #343a40, #2b2c31, #211f22, #151314, #000000) !important;
  }


  //////////////////////////////////////////////////styles that are imported for bookings page merge

  .border_radius_for_booking_page
  {
    border-radius: 8px;
  }

  .overflow_main_dashboard {
    overflow-x: hidden !important;
    background-color: #F8FAFC;
    
  }
  
  .side_nav_main_1 {
    height: 100vh;
    /* width: 40px !important; */
    background-color: white;
    cursor: pointer;
    box-shadow: 5px 0 9px -2px #88888823;
    position: relative;
    z-index: 111;
  }
  
  .height_fiz_menu_active {
    height: 4%;
    background-color: rgb(253, 229, 229);
    border-radius: 10px;
    color: rgb(233, 0, 0);
    margin-top: 50%;
  }
  
  .height_fiz_menu {
    margin-top: 50%;
    color: rgb(170, 170, 170);
  }
  
  .height_fiz_menu1 {
    padding-top: 20%;
    font-size: 140%;
    color: rgb(170, 170, 170);
  }
  
  .background_nav1_header {
    background-color: rgb(233, 0, 0);
    padding-top: 1%;
    padding-bottom: 1%;
  }
  
  .side_nav_1_right {
    width: 100%;
  }
  
  .margin_left_m3 {
    margin-left: -60px;
  }
  
  .col6section {
    color: white;
    font-size: 90%;
    font-weight: 550;
  }
  
  .background_sidenav_one {
    background-color: rgb(248, 250, 252);
    overflow-y: hidden !important;
  }
  
  .background_sidenav_two {
    background-color: white;
    padding-top: 5%;
    padding-bottom: 5%;
    border-radius: 6px;
  }
  
  .background_sidenav_two_t {
    background-color: white;
    padding-top: 3%;
    padding-bottom: 3%;
    border-radius: 6px;
  }
  
  .overflow_hidden {
    overflow-y: hidden !important;
  }
  
  .color_bookings {
    color: rgb(97, 97, 101);
  }
  
  .color_bookings2 {
    color: rgb(97, 97, 101);
    font-size: 70%;
    font-weight: 400;
    cursor: pointer;
    letter-spacing: 70%;
  }
  
  .color_bookings2_active {
    color: rgb(64, 64, 67);
    font-size: 70%;
    font-weight: 550;
    border-bottom: 3px solid rgb(233, 0, 0);
    cursor: pointer;
  }
  
  
  .border_of_subheader {
    border-bottom: 3px solid rgb(239, 240, 241);
  }
  
  .color_bookings1 {
    color: rgb(212, 212, 212);
    font-size: 70%;
  }
  
  .img_set_profile {
    height: 30px;
    width: 30px;
    border-radius: 50px;
  }
  
  .img_set_profile_notifications {
    height: 50px !important;
    width: 50px !important;
    border-radius: 50px;
  }
  
  .equal_padding {
    padding-top: 3%;
    padding-bottom: 2%;
  }
  

  
  .background_color_booking_list {
    background-color: white;
    padding-left: 2%;
    padding-right: 2%;
    padding-top: 1%;
    padding-bottom: 1%;
    border: 2px solid rgb(239, 240, 241);
    border-radius: 8px;
    position: relative;
    cursor: pointer;
    margin-top: 1%;
  }
  
  .img_width_listing {
    /* box-shadow: 1px 1px 3px 3px lightgray; */
    border-radius: 50px;
    height: 80px;
    width: 80px;
  }
  
  .london_text {
    font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #aaa;
  }
  
  .london_text_sub {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #6c6c6c;
  }
  
 
  
  .color_microlaser {
    font-family: Roboto;
  font-size: 14px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444;
  }
  
  .font_size_new {
    font-size: 80%;
    color: rgb(177, 178, 179);
  }
  
  .background_bdg {
    background-color: rgb(240, 244, 245);
  
  }
  
  .text {
    display: inline-block;
    position: relative;
  }
  
  .text::after {
    content: "";
    position: absolute;
    bottom: -10%;
    left: 0;
    width: 100%;
    height: 1.5px;
    background-color: red;
    transform-origin: bottom left;
    transform: rotate(-30deg);
  }
  
  .background_badge {
    background-color: lightgray;
    color: black;
  }
  
  .background_bdg_active {
    background-color: rgb(233, 0, 0) !important;
  }
  
  .font_size_new_active {
    font-size: 80%;
    color: white;
  }
  
  .background_bdg_semi_active {
    background-color: rgb(255, 225, 225) !important;
  }
  
  .font_size_new_semi_active {
    font-size: 80%;
    color: black;
  }
  
  .width_expert_logo {
    width: 20%;
  }
  
  .background_card_color {
    background-color: white;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 1%;
    padding-right: 1%;
    border: 2px solid rgb(239, 240, 241);
    border-radius: 8px;
  }
  
  .width_services {
    height: 15vh;
    width: 15vh;
    border-radius: 60px;
  }
  .width_services1 {
    height: 55px;
    width: 55px;
    border-radius: 60px;
  }
  .width_services11 {
    height: 55px;
    width: 60px;
    border-radius: 60px;
  }
  .heading_frinkle
  {
    font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #000;
  }
  .heading_frinkle1
  {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #aaa;
  }
  
  .font_badge_success {
    background-color: rgb(184, 214, 147);
    font-weight: 300 !important;
    font-size: 65% !important;
    border-radius: 5px !important;
  }
  
  .font_badge_success_w {
    background-color: rgb(214, 207, 147);
    font-weight: 300 !important;
    font-size: 65% !important;
    border-radius: 5px !important;
  }
  
  .heading_service_mod {
    font-size: 80%;
    color: rgb(170, 168, 168);
  }
  
  .heading_service_mod_sub {
    font-size: 90%;
  }
  
  .padding_manage_service {
    padding-left: 5%;
    padding-right: 5%;
  }
  
  .border_bottom_services {
    border-bottom: 1px solid rgb(203, 201, 201);
  }
  


  .card_placeholder
  {
    box-shadow: none !important; 
    outline: none !important;
  }

  .card_placeholder::placeholder
  {
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  color: #6c6c6c;
  
  }

  

  .font_size_card_not_valid
  {
    font-family: Roboto;
    font-size: 10px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.57;
    letter-spacing: normal;
  }

  .card_placeholder1::placeholder
  {
  text-align: center;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  color: #6c6c6c;
  }

  .card_number_text
  {
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.83;
    letter-spacing: normal;
    text-align: left;
    color: #aaa;
  }

  .card-input-field
  {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    border-top: none;
    box-shadow: none !important; 
    outline: none !important;
    padding-left: 0px;
  }

  .border_removal
  {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    border-top: none;
    box-shadow: none !important; 
    outline: none !important;
    font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
  color: #6c6c6c;
}

.border_removal1
  {
    border-radius: 0px;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: none;
    box-shadow: none !important; 
    outline: none !important;
    font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
  color: #6c6c6c;
}
  }

  .card-input-field::placeholder
  {
    font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.57;
  letter-spacing: normal;
  text-align: left;
  color: #6c6c6c;
  
  }

  .Sunspots_frankle
  {
    font-family: Roboto;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.89;
    letter-spacing: normal;
    text-align: left;
    color: #000;
  }

  

  

  
  
  
  .font_cards_width {
    font-size: 80%;
  }
  
  .button_style_danger {
    background-color: rgb(233, 0, 0) !important;
    padding-left: 4% !important;
    padding-right: 4% !important;
  }
  
  #bell_ico_size {
    font-size: 150%;
  }
  
  .spansizing {
    background-color: white;
    color: #D62929;
    font-size: 90%;
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 0%;
    padding-bottom: 0%;
    border-radius: 50px;
    margin-left: -10px !important;
    margin-top: -10px !important;
    position: absolute;
  }
  
  .setting_pos_bell {
    cursor: pointer;
  }
  
  .drop_down_custom {
    position: absolute;
    z-index: 1000;
    right: 200px;
    width: 20%;
    margin-top: 10px;
    border-radius: 10px;
    padding-top: 1%;
    padding-bottom: 1%;
    background-color: white;
    box-shadow: 1px 1px 7px 7px rgba(211, 211, 211, 0.427);
  }
  
  .active-button-style {
    background-color: rgb(253, 232, 233) !important;
    border: rgb(253, 232, 233) !important;
    color: #D62929 !important;
    font-size: 80% !important;
    padding-left: 6% !important;
    padding-right: 6% !important;
  }
  
  .unactive-button-style {
    background-color: white !important;
    border: 0px solid white !important;
    font-size: 80% !important;
    color: rgb(116, 116, 116) !important;
  }
  
  .onerow_background_unread {
    background-color: rgb(237, 243, 255);
    padding-top: 2%;
    padding-bottom: 2%;
  }
  
  .onerow_background_read {
    background-color: white;
    padding-top: 2%;
    padding-bottom: 2%;
  }
  
  .font_size_notofication_description {
    font-size: 80%;
  }
  
  .font_size_notofication_description1 {
    font-size: 80%;
    color: gray;
  }
  
  .fixed_height_notifications {
    height: 40vh;
    overflow-y: scroll;
  }

  ////////////////////////////////////////////////////////////////////////////////hammad module

  .foryouSlider {
    width: 100%;
    height: 440px;
  }
  .foryouSlider img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
  .foryouSlider video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
  .alignForyouSlider {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .alignForyouHeading {
    margin-left: 90px;
    margin-top: 50px;
    margin-bottom: 23px;
  }

  .heroSlider {
    width: 100%;
    position: relative;
  }
  .heroSlider img {
    width: 100%;
  }
  .alignSearchContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .sloganText {
    font-family: "poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    margin-bottom: 17px;
  }
  .sloganBold {
    font-weight: 600;
  }
  .CompleteInputField {
    width: 511px;
    height: 46px;
    background: #f5f5f5;
    border-radius: 6px;
    display: flex;
    align-items: center;
    margin-bottom: 36px;
  }
  
  .inputField {
    height: 46px;
    width: 450px;
    background-color: transparent;
    border: none;
    padding-left: 10px;
    font-style: normal;
    font-weight: 600;
    opacity: 1;
    font-size: 14px;
    /* color: #bababa; */
  }
  .inputField[type="text"]:focus {
    outline: none;
  }
  
  .VoiceSearchIconBg {
    width: 36px;
    height: 36px;
    background: #df0303;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
  }
  .bigOfferText {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-size: 34px;
    margin-bottom: 23px;
    color: #000000;
  }
  .discountText {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    color: #ffffff;
  }
  .getAppBtn {
    width: 173px;
    height: 46px;
    background: #ff6767;
    box-shadow: 0px 9px 18px rgba(255, 118, 118, 0.5);
    border-radius: 6px;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 35px;
  }
  .getAppBtn img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  .categoryAlignContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 140px;
  }
  .itemContainerBox {
    margin: 0 50px;
  }
  .boxAlign {
    width: 80%;
  }
  .textBoxAlign {
    margin-left: 90px;
    margin-top: 30px;
  }
  .productListContainer {
    display: flex;
    align-items: center;
    /* align-items: center; */
    /* justify-content: center; */
    flex-wrap: wrap;
    width: 94%;
    margin: 0 auto;
    /* padding-left: 0.3vw; */
  }
  .productBox {
    /* margin: 0 2.25vw; */
    /* margin-right: 2vw; */
    padding: 0 2vw;
    /* margin-right: vw; */
  }
  .headingAlign {
    margin-left: 90px;
    margin-top: 30px;
  }
  .foryouSlider {
    width: 100%;
  }
  .foryouSlider img {
    width: 100%;
    margin-bottom: 40px;
  }
  .alignForyouSlider {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .alignForyouHeading {
    margin-left: 90px;
    margin-top: 90px;
    margin-bottom: 23px;
  }
  .categoryItemContainer {
    display: flex;
    width: 60px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
  }
  .categoryItemContainer img {
    width: 51px;
    height: 51px;
    border-radius: 50%;
    margin: 0;
    padding: 0;
  }
  .categoryItemContainer p {
    font-family: "Poppins";
    text-align: center;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #5f5f5f;
    margin-top: 20px;
  }
  .headingResuable {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    color: #656565;
  }
  .serviceCardContainer {
    margin-top: 25px;
    margin-bottom: 36px;
    width: 208px;
    /* height: 276px; */
  }
  .imageBox {
    width: 208px;
    height: 276px;
    background: #f6efe5;
    position: relative;
    margin: 0;
    padding: 0;
    border-radius: 12px;
  }
  .imageBox .img {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    object-fit: cover;
  }
  .addToFav {
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: 31.48px;
    height: 31.48px;
    background: #ffffff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .serviceTitle {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    text-transform: uppercase;
    color: #1e1e1e;
    margin-top: 12px;
    margin-bottom: 5px;
  }
  .serviceInfo {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #9d9d9d;
    margin-bottom: 8px;
  }
  .servicePrice {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    color: #3a3a3a;
  }
  .serviceOFF {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #9d9d9d;
  }
  .trendingServiceCard {
    width: 268.09px;
    height: 355px;
    background: #d9d9d9;
    border-radius: 12px;
    position: relative;
    /* margin-right: 160px; */
    margin-top: 25px;
  }
  .trendingServiceCard img {
    width: 100%;
    border-radius: 12px;
  }
  .serviceInfoCard {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    bottom: 8px;
    width: 248.45px;
    height: 134.45px;
  
    background: rgba(255, 255, 255, 0.95);
    /* background: red; */
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    padding: 0 12px;
  }
  
  .serviceInfoCard h3 {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #414141;
    margin-top: 10px;
    margin-bottom: 2px;
  }
  .serviceInfoCard p {
    width: 228.54px;
    height: 72.62px;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.01em;
    color: #414141;
  }
  .serviceCardArrow {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 4px;
    cursor: pointer;
  }
  .serviceListingContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .serviceListingBox {
    width: 90%;
    margin-top: 30px;
  }
  .storyBox {
    height: 240px;
    width: 150px;
    border-radius: 10px;
    background-color: aliceblue;
    margin-right: 30px;
    /* position: relative; */
    border-radius: 15px;
  }
  .storyBox img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 15px;
  }
  .storyBox .test {
    width: 135px;
    position: absolute;
    bottom: 5px;
    left: 8px;
  }
  
  .storyBox p {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    text-transform: uppercase;
    color: #1e1e1e;
    word-wrap: break-word;
  }
  .storiesContainer {
    /* width: 100%; */
    height: 240px;
    margin-left: 90px;
    margin-bottom: 110px;
  }
  .alignStoriesContainer {
    width: 100%;
    display: flex;
    margin-top: 30px;
  }
  .boxAlign {
    width: 100%;
  }
  .trendingBox {
    margin-top: 40px;
    margin-left: 90px;
    /* margin-right: 20px; */
  }

  #style_icons
  {
   font-size: 15px;
  }

  .button_danger_sidebar
  {
    width: 100%;
    border-radius: 10px;
    background-color: #F6E2E5;
    border: 1px solid #F6E2E5;
    color: rgb(233,0,0);
    padding-top: 20%;
  }



  /* ////////////////////////edit booking  */



.button_fiz {
  padding-top: 1px !important;
  padding-bottom: 1px !important;
  padding-left: 6px !important;
  padding-right: 6px !important;
  background-color: rgb(170, 170, 170) !important;
  font-weight: 200 !important;
  border: 0px solid white !important;
}

.button_fiz1 {
  padding-top: 1px !important;
  padding-bottom: 1px !important;
  padding-left: 2px !important;
  padding-right: 2px !important;
  background-color: rgb(170, 170, 170) !important;
  font-weight: 200 !important;
  border: 0px solid white !important;
}

.img_set {
  width: 60%;
}

.label_font_size {
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 3.33;
  letter-spacing: normal;
  text-align: left;
  color: #aaa;
}

.font_sub_text {
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.86;
  letter-spacing: normal;
  text-align: left;
  color: #000;
}


.height_fixxed {
  border: 1px solid lightgray;
  border-radius: 8px;
  height: 40vh;
  overflow-y: scroll;
}

.button_color {
  background-color: lightgray !important;
  color: black !important;
  border: 0px solid lightgray !important;
  width: 100%;
  margin-top: 3%;
}

.react-tel-input input
{
  background-color: white !important;
}

.flag-dropdown
{
  background-color: white !important;
}

.background_grid_auth
{
  background-color: #f8fafc ;
}

.button_color:hover {
  background-color: #D62929 !important;
  color: white !important;
  border: 0px solid lightgray !important;
}

.button_color:focus {
  background-color: #D62929 !important;
  color: white !important;
  border: 0px solid lightgray !important;
}

#style-2::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

#style-2::-webkit-scrollbar {
  width: 8px;
  background-color: #F5F5F5;
}

#style-2::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #D62929;
}

#style-3::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F4F4F4;
}

#style-3::-webkit-scrollbar {
  width: 8px;
  background-color: #F5F5F5;
}

#style-3::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #FFFFFF;
}





                    


`;

export default GlobalStyles;
