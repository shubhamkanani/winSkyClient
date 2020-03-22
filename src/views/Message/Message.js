import React, {Suspense, useEffect, useState, useRef} from 'react'
import  './message.css'
import  {retrieveMessage,sendMsgByAdmin} from './../../api'
import {connect} from "react-redux";
import * as Scroll from 'react-scroll';
import {string} from "prop-types";
function Message(props) {
  const [state,setState] = useState({
    data:[],
    emailList:[]
  })
  const messageList = useRef(null)
  const  [msgInput,setMsgInput] = useState({});
  const [searchInput,setSearchInput] = useState({});
  var scroll = Scroll.animateScroll;

  //use Effect

  useEffect(()=>{
    retrieveMessage().then(res=>setState({emailList:res.emailList}))
  },[]);

  //filter message of one user

  const filterMessage=(emailId)=>{

    const newState = { ...state };
    const filter = [];
    retrieveMessage().then(res=>{
      res.data.map(async (msg)=>{
        if(msg.emailId===emailId){
          await filter.push(msg)
        }
      })
      newState.data = filter;
      setState(newState)
    })
    msgInput.emailId = emailId;
    msgInput.type = props.items.data[0].role;
    console.log(newState)
  }

  //on change input message

  const onChangeMsg = (event) =>{
    setMsgInput({...msgInput,[event.target.name]:event.target.value})
    console.log(msgInput);
  }

  //on send message

  const  onSendMsg = (msgInput) =>{
      sendMsgByAdmin(msgInput).then(res=>{
        filterMessage(msgInput.emailId)
        scrollBottom();
      })
  }

  //scroll for new chat

  const  scrollBottom = () =>{
    scroll.scrollToBottom({
      containerId: "messageList"
    });
  }

  //search input change

  const onSearchChange =(event) =>{
    setSearchInput({...searchInput,[event.target.name]:event.target.value})
    //console.log(searchInput);
  }

  const onSearchClick = () =>{
    if(searchInput.search){
      var searchStr = searchInput.search;
      var searchEmail = []
      state.emailList.map((mail)=>{
        if(mail.search(searchStr)){
            searchEmail.push(mail);
        }
      })
      setState({emailList:searchEmail})
    }
  }

  return(
    <div>
      <div className="inbox_msg">
        <div className="inbox_people">
          <div className="headind_srch">
            <div className="recent_heading">
              <h4>Recent</h4>
            </div>
            <div className="srch_bar">
              <div className="stylish-input-group">
                <input type="text" name ='search' className="search-bar" style={{overflow:'hidden',width:'75%'}} onChange={onSearchChange} placeholder="Search"/>
                <span className="input-group-addon">
                <button type="button" onClick={onSearchClick}> <i className="fa fa-search" aria-hidden="true"></i> </button>
                </span></div>
            </div>
          </div>
          <div className="inbox_chat">
          {console.log(state)}
          {state.emailList && state.emailList.length >= 0 &&
            state.emailList.map((item,index)=>
            {return<div key={index} className="chat_list" onClick={()=>filterMessage(item)}>
                    <div className="chat_people">
                      <div className="chat_img"><img className='img-avatar' src={process.env.REACT_APP_API_URL+'/uploads/'+item+'/'+'profileImage'} alt="image"/></div>
                      <div className="chat_ib">
                        <h5>{item}</h5>
                      </div>
                    </div>
                 </div>
            })
          }
          </div>
        </div>
        <div className="mesgs">
          <div className="msg_history" id='messageList' onLoad={scrollBottom}>
            {state.data &&
            state.data.map((item,index)=>
            {return <div  key={index} >
              {item.type==='user' &&  <div className="incoming_msg">
                <div className="incoming_msg_img"><img className="img-avatar" src={process.env.REACT_APP_API_URL+'/uploads/'+item.emailId+'/'+'profileImage'} alt="sam"/>
                </div>
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>{item.message}</p>
                    <span className="time_date"> {item.createdAt} </span></div>
                </div>
              </div>
              }{ item.type === 'admin' && <div className="outgoing_msg">
              <div className="sent_msg">
                <p>{item.message}</p>
                <span className="time_date"> {item.createdAt}</span></div>
            </div>
            }
            </div>
            })
            }

          </div>
          <div className="type_msg">
            <div className="input_msg_write">
              <input type="text" name="message" className="write_msg" placeholder="Type a message" onChange={onChangeMsg}/>
              <button className="msg_send_btn" type="button" onClick={()=>onSendMsg(msgInput)}><i className="fa fa-paper-plane-o" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state =>({
  ...state,
  // console.log(userData.items.data[0].role)
  // return userData.items.data[0].role
})
export default connect(mapStateToProps,null)(Message);
