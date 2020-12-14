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
  List,
  Container
} from 'native-base'
import { NavigationContainerProps } from "react-navigation"

export interface NotificationScreenProps extends NavigationContainerProps<{}> {
}


export const NotificationsScreen: React.FunctionComponent<NotificationScreenProps> = observer((props) => {
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
      {/* light-content ,dark-content*/}
      <Container style={{ backgroundColor: '#fcfcfc' }}>
        <StatusBar backgroundColor="#29B6F6" barStyle="light-content" />
        <HeadBer theme="#29B6F6" title='การเเจ้งเตือน' />

        <ScrollView>
          <List>
            <View>
              <Text style={{ marginHorizontal: 20, marginVertical: 10 }}>ล่าสุด</Text>
              <View style={{ paddingHorizontal: 20 }}>
                <NotiItem
                  urlImg={userImg[0]}
                  name="Arisa Rangklang"
                  detail="ได้สมัครเป็นนักเรียนในโพสต์ของคุณ"
                  dateTime="2:45"
                />
              </View>
              <View style={styles.lineStyle} />
            </View>
            <View>
              <Text style={{ marginHorizontal: 20, marginVertical: 10 }}>ก่อนหน้า</Text>
              <View style={{ paddingHorizontal: 20 }}>
                <NotiItem
                  urlImg={userImg[1]}
                  name="Mint Plongmai"
                  detail="ได้สมัครเป็นติวเตอร์ในโพสต์ของคุณ"
                  dateTime="เมื่อวาน"
                />
                <NotiItem
                  urlImg={userImg[2]}
                  name="Nipaporn Tepseeha"
                  detail="ได้สมัครเป็นติวเตอร์ในโพสต์ของคุณ"
                  dateTime="วันอังคาร"
                />
                <NotiItem
                  urlImg={userImg[3]}
                  name="Ornthiwa Jaruensuk"
                  detail="ได้สมัครเป็นนักเรียนในโพสต์ของคุณ"
                  dateTime="90/11"
                />
                <NotiItem
                  urlImg={userImg[4]}
                  name="DJBBM"
                  detail="ได้กดติดตามคุณ"
                  dateTime="01:15"
                />
              </View>
              <View style={styles.lineStyle} />
            </View>
          </List>
        </ScrollView>

      </Container>
    </>
  )
})


const styles = StyleSheet.create({
  lineStyle: {
    borderBottomColor: '#DBDADA',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 15,
    marginVertical: 10,

  },
})
export interface NotiItemProps {
  urlImg?: string,
  name?: string,
  detail?: string,
  dateTime?: string,
}

const NotiItem: React.FunctionComponent<NotiItemProps> = props => {
  return (
    <>
      <ListItem avatar noBorder>
        <TouchableOpacity style={{ flexDirection: 'row' }}>
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

      <View style={{ width: 70 }}>
        {/* <Button
          onPress={props.goBackPage}
          vertical
          bordered
          style={{ borderColor: '#29B6F6', backgroundColor: '#29B6F6' }}>
          <Icon type="AntDesign" name="arrowleft" style={{ color: 'white', fontSize: Platform.OS === 'ios' ? 30 : 38, }} />
        </Button> */}
      </View>

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
      </View>
    </Header>
  )
}
