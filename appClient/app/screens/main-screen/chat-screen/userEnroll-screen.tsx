import React from "react"
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
  SafeAreaView,
  ViewStyle,
  TextStyle,
} from 'react-native'
import {
  Icon,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Text
} from 'native-base'
import { spacing } from "../../../theme"
import { observer } from "mobx-react-lite"
import { NavigationInjectedProps } from "react-navigation"
import { ScrollView } from "react-native-gesture-handler"


export interface UserEnrollScreenProps extends NavigationInjectedProps<{}> {

}
export const UserEnrollScreen: React.FunctionComponent<UserEnrollScreenProps> = observer((props) => {
  const goBack = React.useMemo(() => () => props.navigation.goBack(null), [props.navigation])
  return (
    <>
      <UserEnrollView goBack={goBack} />
    </>
  )
})
const FULL: ViewStyle = {
  flex: 1,
}
interface UserEnrollViewProps {
  goBack?: () => void,
}
class UserEnrollView extends React.Component<UserEnrollViewProps, {}> {
  render() {
    return (
      <>
        <View style={FULL}>
          {/* Header */}
          <HeadBar headName='TRANSACTION HISTORY' title='เเคลคูลัส 2(42)' goBackPage={this.props.goBack} goUserEnroll={this.props.goUserEnroll} />

          {Platform.OS === 'android' ?
            this.renderBody() :
            <KeyboardAvoidingView style={FULL} behavior="padding">
              {this.renderBody()}
            </KeyboardAvoidingView>
          }

        </View>
      </>
    )
  }

  renderBody = () => {
    const userImg = [
      'https://image.shutterstock.com/mosaic_250/1020994/660004024/stock-photo-happy-student-looking-at-you-with-thumbs-up-in-a-classroom-with-classmates-in-the-background-660004024.jpg',
      'https://image.shutterstock.com/mosaic_250/2797510/705449866/stock-photo-selfie-time-four-international-students-with-beaming-smiles-are-posing-for-selfie-shot-caucasian-705449866.jpg',
      'https://image.shutterstock.com/mosaic_250/1060631/564247138/stock-photo-in-the-library-pretty-female-student-with-books-working-in-a-high-school-library-564247138.jpg',
      'https://image.shutterstock.com/mosaic_250/163108/524512270/stock-photo-close-up-shot-of-young-woman-writing-notes-with-classmates-studying-in-background-students-524512270.jpg',
      'https://www.stockvault.net//data/2012/03/06/129770/thumb16.jpg',
      'https://www.stockvault.net//data/2011/10/30/127712/thumb16.jpg',
      'https://image.shutterstock.com/mosaic_250/580987/713908198/stock-photo-happy-smiling-asian-woman-working-on-laptop-computer-while-sitting-on-the-floor-with-legs-crossed-713908198.jpg',
    ];
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20
      }}>
        <ScrollView>
          <UserItem
            urlImg={userImg[1]}
            name="Mint Plongmai"
            status="ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[2]}
            name="Nipaporn Tepseeha"
            status="ยังไม่ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[3]}
            name="Ornthiwa Jaruensuk"
            status="ยังไม่ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[4]}
            name="DJBBM"
            status="ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[5]}
            name="Ornthiwa Jaruensuk"
            status="ยังไม่ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[6]}
            name="DJBBM"
            status="ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[2]}
            name="Nipaporn Tepseeha"
            status="ยังไม่ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[3]}
            name="Ornthiwa Jaruensuk"
            status="ยังไม่ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[4]}
            name="DJBBM"
            status="ชำระเงินเเล้ว"
          />
          <UserItem
            urlImg={userImg[5]}
            name="Ornthiwa Jaruensuk"
            status="ยังไม่ชำระเงินเเล้ว"
          />
        </ScrollView>

      </View>
    )
  }
}

const lineStyle: ViewStyle = {
  borderBottomColor: '#DBDADA',
  borderBottomWidth: 1,
}

export interface NotiItemProps {
  urlImg?: string,
  name?: string,
  status?: string,
  dateTime?: string,
}

const UserItem: React.FunctionComponent<NotiItemProps> = props => {
  return (
    <>
      <ListItem avatar noBorder style={{}}>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
          <Left style={{ flexDirection: 'column', paddingVertical: 10 }}>
            <Thumbnail
              source={{
                uri: props.urlImg,
              }}
            />
          </Left>
          <Body style={{ flexDirection: 'column', justifyContent: 'center' }}>
            <Text>{props.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon type="AntDesign" name="file1" style={{ fontSize: 15, marginRight: 5 }} />
              <Text note>{props.status}</Text>
            </View>
          </Body>
          <Right />
        </TouchableOpacity>
      </ListItem>
    </>
  )
}

const HEADER: TextStyle = {
  flexDirection: 'column',
  backgroundColor: '#29B6F6',
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[4]
}

const TEXT_HEADER_TITLE: TextStyle = {
  fontSize: Platform.OS === 'ios' ? 20 : 20,
  color: 'white',
  fontWeight: 'bold',
  alignSelf: 'center'
}

const HEADER_TITLE: TextStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const HEADER_BOOTTOM: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  backgroundColor: '#FFF',
  elevation: 5,
  shadowColor: 'grey',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowOpacity: 0.5,
}

const LINE_BOOTTOM: ViewStyle = {
  borderBottomColor: 'black',
  borderBottomWidth: 2,
  borderRadius: 5
}

const TEXT_BOOTTOM: TextStyle = {
  margin: 10,
  fontSize: 18,
  color: 'grey'
}

interface HeadBerProps {
  theme?: string,
  headName?: string,
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

              <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <Text style={TEXT_HEADER_TITLE}>
                  {this.props.headName}
                </Text>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: 18,
                    color: 'black'

                  }}>
                  {this.props.title}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', width: 70, justifyContent: 'flex-end' }}>
              </View>
            </View>
          </View>
        </SafeAreaView>

        <View style={HEADER_BOOTTOM}>
          
          <View style={{ flexDirection: 'column' }}>
            <TouchableOpacity>
              <Text
                style={TEXT_BOOTTOM}>
                ผู้ลงทะเบียน
            </Text>
            </TouchableOpacity>

            <View style={LINE_BOOTTOM}></View>
          </View>
          <TouchableOpacity>
            <Text
              style={TEXT_BOOTTOM}>
              ยกเลิกคอร์ส
            </Text>
          </TouchableOpacity>

        </View>

      </>
    );
  }
}