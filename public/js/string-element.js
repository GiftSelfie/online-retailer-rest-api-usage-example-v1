window.modalStringElement = '<div class="modal fade" id="myModal">'+
'      <div class="modal-dialog">'+
'        <div class="modal-content">'+
'          <div class="modal-header">'+
'            <h4 class="modal-title">Giftselfie</h4>'+
'            <button type="button" class="close" data-dismiss="modal">×</button>'+
'          </div>'+
''+
'          <div class="modal-body">'+
'              <router-view></router-view>'+
'          </div>'+
''+         
'        </div>'+
'      </div>'+
'    </div>';


window.customerFormStringElement =  '   <div class="row">  '  + 
'         <div class="col-md-12">  '  + 
'           <div class="form-group">  '  + 
'             <label for="">Your nick name</label>  '  + 
'             <input @change="setYourNickName($event)" :value="your_nick_name" type="text" class="form-control form-control-sm">  '  + 
'           </div>  '  + 
'           <div class="form-group">  '  + 
'             <label for="">Your gender</label>  '  + 
'             <select @change="setYourGender($event)" class="form-control form-control-sm">  '  + 
'               <option :selected="your_gender == option.value" :value="option.value" v-for="option in gender_options">{{ option.key }}</option>  '  + 
'             </select>  '  + 
'           </div>  '  + 
'           <div class="form-group">  '  + 
'             <label for="">Your mobile</label>  '  + 
'             <input :value="your_mobile" @change="setYourMobile($event)" id="customer-mobile-input" type="text" class="form-control form-control-sm">  '  + 
'           </div>  '  + 
'           <div class="form-group text-right">  '  + 
'             <button @click="back" class="btn btn-danger">Back</button>  '  + 
'             <button @click="next" class="btn btn-success">Next</button>  '  + 
'           </div>  '  + 
'         </div>  '  + 
'      </div>  ' ; 
  
window.giftGiverFormStringElement =  '   <div class="row">  '  + 
 '           <div class="col-md-12">  '  + 
 '               <div class="form-group">  '  + 
 '                   <label for="">Gift giver nick name</label>  '  + 
 '                   <input @change="setGiftGiverNickName($event)" :value="gift_giver_nick_name" type="text" class="form-control">  '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                   <label for="">Gift giver mobile</label>  '  + 
 '                   <input @change="setGiftGiverMobile($event)" :value="gift_giver_mobile" id="gift-giver-mobile-input" type="text" class="form-control form-control-sm">  '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                   <label for="">Your relationship with gift giver</label>  '  + 
 '                   <select @change="setGiftGiverRelationship($event)" class="form-control">  '  + 
 '                       <option :selected="relationship.id == gift_giver_relationship" v-for="relationship in relationship_options" :value="relationship.id">{{ relationship.name }}</option>  '  + 
 '                   </select>  '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                   <label for="">Gift request message</label>  '  + 
 '                   <textarea @change="setSmsWording($event)" class="form-control" name="" id="" cols="30" rows="10">{{ sms_wording }}</textarea>  '  + 
 '               </div>  '  + 
 '               <div class="form-group text-right">  '  + 
 '                   <button @click="back" class="btn btn-danger">Back</button>  '  + 
 '                   <button @click="sendGiftRequest" class="btn btn-success">Send gift request</button>  '  + 
 '               </div>  '  + 
 '           </div>  '  + 
 '      </div>  ' ;

window.occasionFormStringElement =  '   <div class="row">  '  + 
 '           <div class="col-md-12">  '  + 
 '               <div class="form-group">  '  + 
 '                   <label for="">Occasion name</label>  '  + 
 '                   <select @change="setOccasion($event)" class="form-control">  '  + 
 '                       <option :selected="occasion_option.id == occasion" v-for="occasion_option in occasion_options" :value="occasion_option.id">{{ occasion_option.name }}</option>  '  + 
 '                   </select>    '  + 
 '               </div>          '  + 
 '               <div class="form-group" v-show="is_showing_occasion_date_input">  '  + 
 '                   <label for="">Occasion date</label>  '  + 
 '                   <input :value="occasion_date" type="text" class="form-control" id="occasion-date-input">  '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                   <label for="">Gift name</label>  '  + 
 '                   <input readonly :value="gift_name" type="text" class="form-control">    '  + 
 '               </div>  '  + 
 '               <div class="form-group">  '  + 
 '                   <label for="">Additional info</label>  '  + 
 '                   <textarea @change="setAdditionalInfo($event)" class="form-control" name="" id="" cols="30" rows="10">{{ additional_info }}</textarea>  '  + 
 '               </div>         '  + 
 '               <div class="form-group text-right">  '  + 
 '                   <button @click="next" class="btn btn-success">Next</button>  '  + 
 '               </div>  '  + 
 '           </div>  '  + 
 '      </div>  ' ;

 window.successStringElement  = '<div class="row">'+
 '        <div class="col-md-12">'+
 '            <div class="alert alert-success">'+
 '                <strong>{{ message }}</strong> '+
 '              </div>'+
 '        </div>'+
 '    </div>';

 window.errorStringElement  = '<div class="row">'+
 '        <div class="col-md-12">'+
 '            <div class="alert alert-danger">'+
 '                <strong>{{ message }}</strong> '+
 '              </div>'+
 '        </div>'+
 '    </div>';