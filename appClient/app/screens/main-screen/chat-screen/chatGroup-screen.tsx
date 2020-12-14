import React from "react"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
} from 'react-native'
import {
  Icon
} from 'native-base'
import { spacing } from "../../../theme"
import { observer } from "mobx-react-lite"
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput'
import { CollapsibleHeaderFlatList } from 'react-native-collapsible-header-views'
import { NavigationInjectedProps } from "react-navigation"

export interface ChatGroupScreenProps extends NavigationInjectedProps<{}> {
  inputBarText?: string
}
export const ChatGroupScreen: React.FunctionComponent<ChatGroupScreenProps> = observer((props) => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])

  const goUserEnroll = () => { props.navigation.navigate("userEnrollScreen") }

  return (
    <>
      <ChatView goBack={goBack} goUserEnroll={goUserEnroll} />
    </>

  )
})

const FULL: ViewStyle = {
  flex: 1,
}

const HEADER_BOOTTOM: ViewStyle = {
  flexDirection: 'row',
  justifyContent:  'space-around',
  backgroundColor: '#FFF',
  elevation: 5,
  shadowColor: 'grey',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.5,
  paddingVertical: 20,
  height: 70
}

const LINE_BOOTTOM: ViewStyle = {
  borderBottomColor: 'black',
  borderBottomWidth: 2,
  borderRadius: 5,
  marginBottom: 2
}

const TEXT_BOOTTOM: TextStyle = {
  fontSize: 18,
  color: 'grey'
}

interface ChatViewProps {
  goBack?: () => void,
  goUserEnroll?: () => void,
}

class ChatView extends React.Component<ChatViewProps, {}> {
  render() {
    return (
      <>
        <View style={FULL}>
          {/* Header */}
          <HeadBar title='เเคลคูลัส 2' goBackPage={this.props.goBack} goUserEnroll={this.props.goUserEnroll} />

          {Platform.OS === 'android' ?
            this.renderBody()
            :
            <KeyboardAvoidingView style={FULL} behavior="padding">
              {this.renderBody()}
            </KeyboardAvoidingView>
          }

        </View>
      </>
    )
  }

  renderBottomHeader = () => {
    return (
      <>
        <View style={HEADER_BOOTTOM}>

          <TouchableOpacity style={{ flexDirection: 'row', }}>
            <Text
              style={TEXT_BOOTTOM}>
              ร้องเรียน
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', }}>
            <Text
              style={TEXT_BOOTTOM}>
              ลงทะเบียน
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flexDirection: 'row', }}>
            <Text
              style={TEXT_BOOTTOM}>
              ออกจากกลุ่ม
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  renderBody = () => {

    var messages = require("./chatHistory.json")

    return (
      <View style={{ flex: 1,backgroundColor: '#FFF', flexDirection: 'column', justifyContent: 'flex-end' }}>
        
        {/*List Msg*/}
        <CollapsibleHeaderFlatList
          CollapsibleHeaderComponent={this.renderBottomHeader()}
          clipHeader={true}
          style={{flex:1,marginTop:-70}}
          headerHeight={70}
          headerContainerBackgroundColor={'transparent'}
          disableHeaderSnap={true}
          //messages == messages.reverse
          data={messages.chatHistory.reverse()}
          renderItem={({ item, index }) =>

            <MessageBubble
              key={`msgList-${index.toString()}`}
              msgId={item.id}
              useImg={item.useImg}
              direction={item.direction}
              textMsg={item.text}
            />

          }
          // set fix keyboard reverse data  inverted={true}
          //messages.reverse.reverse == messages
          inverted={true}
          keyExtractor={(item, index) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
        />

        {/*Input*/}
        <InputMsg />
      </View>
    )
  }
}

//MessageBubble left
const messageSpacerLeft: ViewStyle = {
  flexDirection: 'row',
  flex: 4,
  alignSelf: 'flex-start'
}

const messageBubbleLeft: ViewStyle = {
  backgroundColor: '#d5d8d4',
  borderRadius: 5,
  marginTop: 8,
  marginRight: 10,
  marginLeft: 10,
  paddingHorizontal: 10,
  paddingVertical: 5,

}

const messageBubbleTextLeft: TextStyle = {
  color: 'black',
}

//MessageBubble Right
const messageSpacerRight: ViewStyle = {
  flexDirection: 'row',
  flex: 4,
  justifyContent: 'flex-end'
}

const messageBubbleRight: ViewStyle = {
  backgroundColor: '#41B6F6',
  borderRadius: 5,
  marginTop: 8,
  marginRight: 10,
  marginLeft: 10,
  paddingHorizontal: 10,
  paddingVertical: 5,
}

const messageBubbleTextRight: TextStyle = {
  color: 'white',
}

interface MessageBubbleProps {
  msgId?: string,
  direction?: string,
  textMsg?: string
  useImg?: string,
}

class MessageBubble extends React.Component<MessageBubbleProps, {}> {

  render() {
    let useImg = this.props.direction === 'left' ? [<View style={{ flexDirection: 'column', alignSelf: 'flex-end' }}>
      <Image
        source={{
          uri: this.props.useImg
        }}
        style={{ borderRadius: 15, height: 30, width: 30, padding: 0, margin: 0, marginLeft: 10 }}
      />
    </View>] : null;

    let leftSpacer = this.props.direction === 'left' ? null : [<View style={{ flex: 1 }} ></View>];

    let rightSpacer = this.props.direction === 'left' ? [<View style={{ flex: 1 }} ></View>] : null;

    let msgSpacer = this.props.direction === 'left' ? [messageSpacerLeft] : [messageSpacerRight];

    let bubbleStyles = this.props.direction === 'left' ? [messageBubbleLeft] : [messageBubbleRight];

    let bubbleTextStyle = this.props.direction === 'left' ? messageBubbleTextLeft : messageBubbleTextRight;
    return (
      <>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1,position:'relative',bottom:70 }}>
          {leftSpacer}
          <View style={msgSpacer}>
            {useImg}
            <View style={bubbleStyles}>
              <Text style={bubbleTextStyle}>
                {this.props.textMsg}
              </Text>
            </View>
          </View>
          {rightSpacer}
        </View>
      </>
    );
  }
}


const FOOTER: ViewStyle = {
  backgroundColor: "#FFF"
}

const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const TextInputRowAuto: TextStyle = {
  fontSize: 18,
  flexDirection: 'row',
  color: 'black',
  borderRadius: 20,
  borderColor: '#A5A5A5',
  borderWidth: .5,
  padding: 10,
  paddingTop: 11,
  paddingStart: 12
}

interface InputMsgProps {
  sendMessage?: () => void
}

class InputMsg extends React.Component<InputMsgProps, {}> {

  render() {

    return (
      <>
        <SafeAreaView style={FOOTER}>
          <View style={FOOTER_CONTENT}>
            <View style={{
              flexDirection: 'row',
            }}>
              <View style={{ flexDirection: 'column', alignItems: 'flex-end', alignSelf: 'flex-end', }}>
                <TouchableOpacity onPress={this.props.sendMessage}>
                  <Icon
                    type="Entypo" name="circle-with-plus"
                    style={{ color: '#29B6F6', fontSize: 30, margin: 10, marginLeft: 0 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignSelf: 'center' }}>
                <AutoGrowingTextInput
                  style={TextInputRowAuto}
                  placeholder={"ส่งข้อความ..."}
                  maxHeight={100}
                  minHeight={40}
                  enableScrollToCaret
                />
              </View>

              <View style={{ flexDirection: 'column', alignItems: 'flex-end', alignSelf: 'flex-end', }}>
                <TouchableOpacity onPress={() => {}}>
                  <Icon
                    type="FontAwesome" name="send"
                    style={{ color: '#29B6F6', fontSize: 25, margin: 10, }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const TEXT_HEADER_TITLE: TextStyle = {
  fontSize: Platform.OS === 'ios' ? 25 : 25,
  color: 'white',
  fontWeight: 'bold',
  alignSelf: 'center'
}

const TEXT_HEADER_CONTENT: TextStyle = {
  fontSize: Platform.OS === 'ios' ? 15 : 15,
  color: 'white',
  fontWeight: 'bold',
}

const HEADER: TextStyle = {
  flexDirection: 'column',
  backgroundColor: '#29B6F6',
  elevation: 5,
  shadowColor: 'grey',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.5,
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[4]
}

const HEADER_TITLE: TextStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const HEADER_LIST: TextStyle = {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}

interface HeadBerProps {
  theme?: string,
  title?: string,
  goBackPage?: () => void,
  goUserEnroll?: () => void,
}

class HeadBar extends React.Component<HeadBerProps, {}> {

  render() {
    
    return (
      <>
        <SafeAreaView style={{
          //set color statusBar
          backgroundColor: '#29B6F6',
        }}>
          <View style={HEADER}>
            <View style={HEADER_TITLE}>

              <View style={{ flexDirection: 'row', width: 70, justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={this.props.goBackPage}>
                  <Icon
                    type="AntDesign"
                    name="arrowleft"
                    style={{
                      color: 'white', fontSize: Platform.OS === 'ios' ? 30 : 30,
                    }} />
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'column' }}>
                <Text style={TEXT_HEADER_TITLE}>
                  {this.props.title}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center'
                  }}>
                  online now
              </Text>
              </View>

              <View style={{ flexDirection: 'row', width: 70, justifyContent: 'flex-end' }}>

                <TouchableOpacity onPress={this.props.goUserEnroll}>
                  <Icon
                    type="FontAwesome5"
                    name="ellipsis-h"
                    style={{
                      color: 'white',
                      fontSize: Platform.OS === 'ios' ? 30 : 30,
                    }} />

                </TouchableOpacity>
              </View>

            </View>

            <View style={HEADER_LIST}>

              <View style={{ width: 70, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={{
                    uri: 'https://image.shutterstock.com/mosaic_250/1060631/564247138/stock-photo-in-the-library-pretty-female-student-with-books-working-in-a-high-school-library-564247138.jpg',
                  }}
                  style={{ borderRadius: 35, height: 70, width: 70 }}
                />
              </View>

              <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
                <Text style={TEXT_HEADER_CONTENT}>
                  TIME 12:00-13:00
              </Text>
                <Text style={TEXT_HEADER_CONTENT}>
                  DATE 13 พค 2562
              </Text>
                <Text style={TEXT_HEADER_CONTENT}>
                  AT บรรณาสารชั้น 2
              </Text>
                <Text style={TEXT_HEADER_CONTENT}>
                  ENROLL 30 คน (ชำระแล้ว)
              </Text>
              </View>

              <View style={{ width: 70, }}>
              </View>

            </View>
          </View>

        </SafeAreaView>
      </>
    );
  }
}


