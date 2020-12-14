import React from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ScrollView, StyleSheet, Platform, StatusBar } from "react-native"
import {
  Header,
  Text,
  Body,
  View,
  Thumbnail,
  Left,
  ListItem,
  Right,
  Container,
  Icon,
  Item,
  List,
  Input,
  Form,
  Button,
  Badge
} from 'native-base'
import { NavigationContainerProps } from "react-navigation"

export interface ChatScreenProps extends NavigationContainerProps<{}> {
}


export const ChatScreen: React.FunctionComponent<ChatScreenProps> = observer((props) => {

  const goRoot = () => { props.navigation.navigate("primaryStack") }
  const goChatGroup = () => { props.navigation.navigate("ChatGroupScreen") }

  const userImg = [
    'https://image.shutterstock.com/mosaic_250/1020994/660004024/stock-photo-happy-student-looking-at-you-with-thumbs-up-in-a-classroom-with-classmates-in-the-background-660004024.jpg',
    'https://image.shutterstock.com/mosaic_250/2797510/705449866/stock-photo-selfie-time-four-international-students-with-beaming-smiles-are-posing-for-selfie-shot-caucasian-705449866.jpg',
    'https://image.shutterstock.com/mosaic_250/1060631/564247138/stock-photo-in-the-library-pretty-female-student-with-books-working-in-a-high-school-library-564247138.jpg',
    'https://image.shutterstock.com/mosaic_250/163108/524512270/stock-photo-close-up-shot-of-young-woman-writing-notes-with-classmates-studying-in-background-students-524512270.jpg',
    'https://www.stockvault.net//data/2012/03/06/129770/thumb16.jpg',
    'https://www.stockvault.net//data/2011/10/30/127712/thumb16.jpg',
    'https://image.shutterstock.com/mosaic_250/580987/713908198/stock-photo-happy-smiling-asian-woman-working-on-laptop-computer-while-sitting-on-the-floor-with-legs-crossed-713908198.jpg',
  ]
  return (
    <>
      <Container style={{ backgroundColor: '#fcfcfc' }}>
        {/* light-content ,dark-content*/}
        <StatusBar backgroundColor="#29B6F6" barStyle="light-content" />
        <HeadBer theme="#29B6F6" title='เเชท' goBackPage={goRoot} />
        <ScrollView>

          <View style={{ paddingHorizontal: 10 }}>
            <Form style={{ marginHorizontal: 20, marginTop: 20 }}>
              <Item rounded style={{ margin: 0, padding: 0, height: 40 }}>
                <Icon type="FontAwesome" name="search" style={{ color: '#636363', fontSize: 18 }} />
                <Input
                  placeholder="ค้นหา"
                  style={{ fontSize: 16, paddingLeft: 0 }}
                />
              </Item>
            </Form>
          </View>

          <View style={{ paddingHorizontal: 10, marginTop: 10 }}>

            <ChatGroup
              urlImg={userImg[2]}
              name="แคลคูลัส 1"
              detail="Mint Plongmai ได้ส่งวิดีโอ"
              dateTime="18:00"
              noti="1"
              goChatGroup={goChatGroup}

            />
            <ChatGroup
              urlImg={userImg[3]}
              name="คอมโปร 2"
              detail="Ornthiwa Jaruensuk ได้ส่งรูป"
              dateTime="เมื่อวาน"
              noti="19"
              goChatGroup={goChatGroup}
            />
            <ChatGroup
              urlImg={userImg[4]}
              name="อังกฤษเพื่อการสื่อสาร 4"
              detail="DJBBM ได้สร้างโหวต"
              dateTime="วันจันทร์"
              noti="3"
              goChatGroup={goChatGroup}
            />
            <ChatGroup
              urlImg={userImg[1]}
              name="แคลคูลัส 1"
              detail="Mint Plongmai ได้ส่งวิดีโอ"
              dateTime="23/09"
              noti="1"
              goChatGroup={goChatGroup}

            />

          </View>

        </ScrollView>
      </Container>

    </>
  )
})

export interface ChatGroupProps {
  urlImg?: string,
  name?: string,
  detail?: string,
  dateTime?: string,
  noti?: string,
  goChatGroup?: () => void
}

const ChatGroup: React.FunctionComponent<ChatGroupProps> = props => {
  return (
    <>
      <ListItem avatar noBorder>
        <TouchableOpacity onPress={props.goChatGroup} style={{ flexDirection: 'row' }}>
          <Left>
            <Thumbnail
              source={{
                uri: props.urlImg,
              }}
            />
          </Left>
          <Body>
            <Text>{props.name}</Text>
            <Text note>{props.detail}</Text>
          </Body>
          <Right style={{ paddingTop: 10 }}>
            <Text note>{props.dateTime}</Text>
            <Badge success>
              <Text>{props.noti}</Text>
            </Badge>
          </Right>
        </TouchableOpacity>
      </ListItem>
    </>
  )
}

export interface HeadBerProps {
  theme?: string,
  title?: string,
  goBackPage?: () => void
}

const HeadBer: React.FunctionComponent<HeadBerProps> = props => {
  return (
    <Header
      style={{
        height: 80,
        backgroundColor: props.theme,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>

      <View style={{ width: 70 }}></View>

      <View>
        <Text
          style={{
            fontSize: Platform.OS === 'ios' ? 25 : 25,
            color: 'white',
            fontWeight: 'bold',
          }}>
          {props.title}
        </Text>
      </View>
      <View style={{ width: 70 }}>
        <Button
          onPress={props.goBackPage}
          vertical
          bordered
          style={{ borderColor: '#29B6F6', backgroundColor: '#29B6F6' }}>
          <Icon type="MaterialCommunityIcons" name="square-edit-outline" style={{ color: 'white', fontSize: Platform.OS === 'ios' ? 25 : 25, }} />
        </Button>
      </View>
    </Header>
  )
}

