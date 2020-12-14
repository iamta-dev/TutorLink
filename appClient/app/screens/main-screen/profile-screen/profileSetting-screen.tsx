import React from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, Dimensions, StyleSheet, Image, Platform, StatusBar } from "react-native"
import {
  Header,
  Text,
  View,
  Button,
  Icon,
  Label,
  Container
} from 'native-base';
import { NavigationContainerProps } from "react-navigation"

export interface ProfileSettingScreenProps extends NavigationContainerProps<{}> {
}


export const ProfileSettingScreen: React.FunctionComponent<ProfileSettingScreenProps> = observer((props) => {

  const { navigation } = props
  const goEditPersonalData = () => { navigation.navigate("editPersonalData") }
  const goEditProfileData = () => { navigation.navigate("editProfileData") }
  const goBack = React.useMemo(() => () => navigation.goBack(null), [props.navigation])

  return (
    <>
      <Container style={{ backgroundColor: '#fcfcfc' }}>
        {/* light-content ,dark-content*/}
        <StatusBar backgroundColor="#29B6F6" barStyle="light-content" />
        <HeadBer theme="#29B6F6" title='ตั้งค่าโปรไฟล์' goBackPage={goBack} />

        <ScrollView>
          <View style={styles.coverContainer}>
            <HeadTopic topicName="รูปภาพโปรไฟล์" />
            <View style={styles.topicContainer}>
              <Image
                source={{
                  uri:
                    'https://image.shutterstock.com/mosaic_250/2936380/613759379/stock-photo-happy-cheerful-young-woman-wearing-her-red-hair-in-bun-rejoicing-at-positive-news-or-birthday-gift-613759379.jpg',
                }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.lineStyle} />


            <HeadTopic topicName="รูปภาพพื้นหลัง" />
            <View style={styles.topicContainer}>
              <Image
                source={{
                  uri:
                    'https://images.pexels.com/photos/3792581/pexels-photo-3792581.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
                }}
                style={styles.coverImage}
              />
            </View>

            <View style={styles.lineStyle} />

            <HeadTopic topicName="ข้อมูลหน้าโปรไฟล์" goLinkPage={goEditProfileData} />
            <View style={{ marginHorizontal: 40, marginVertical: 10, }}>

              <View style={{
                flexDirection: 'row',
                alignContent: 'flex-start',
                marginVertical: 5,
              }}>
                <Icon type="Entypo" name="graduation-cap" style={{ color: '#3375CC', fontSize: 26, margin: 10, marginTop: 0, marginLeft: 0, width: 30 }} />
                <Text style={{ marginRight: 10, }}>กำลังศึกษาที่ Suranaree University of Technology - SUT</Text>
              </View>

              <View style={{
                flexDirection: 'row',
                alignContent: 'flex-start',
                marginVertical: 5,
              }}>
                <Icon type="FontAwesome" name="phone" style={{ color: '#3375CC', fontSize: 25, margin: 10, marginTop: 0, marginLeft: 0, width: 30 }} />
                <Text style={{ marginRight: 10, }}>0902586172</Text>
              </View>

              <View style={{
                flexDirection: 'row',
                alignContent: 'flex-start',
                marginVertical: 5,
              }}>
                <Icon type="FontAwesome" name="child" style={{ color: '#3375CC', fontSize: 25, margin: 10, marginTop: 0, marginLeft: 0, width: 30 }} />
                <Text style={{ marginRight: 10, }}>21 ปี</Text>
              </View>
              <View style={{
                flexDirection: 'row',
                alignContent: 'flex-start',
                marginVertical: 5,
              }}>
                <Icon type="Entypo" name="add-user" style={{ color: '#3375CC', fontSize: 23, margin: 10, marginTop: 0, marginLeft: 0, width: 30 }} />
                <Text style={{ marginRight: 10, }}>มีผู้ติดตาม 254 คน</Text>
              </View>
            </View>
            <View style={styles.lineStyle} />

            <HeadTopic topicName="ข้อมูลส่วนตัว" goLinkPage={goEditPersonalData} />
            <View style={{ marginHorizontal: 40, marginVertical: 10, }}>
              <View>
                <Label style={{ color: 'black' }}>ชื่อ</Label>
                <Label style={{ color: '#595E62' }}>Natthawat</Label>
              </View>
              <View>
                <Label style={{ color: 'black' }}>นามสกุล</Label>
                <Label style={{ color: '#595E62' }}>Narin</Label>
              </View>
              <View>
                <Label style={{ color: 'black' }}>กรอกเบอร์โทรศัพท์</Label>
                <Label style={{ color: '#595E62' }}>0902586172</Label>
              </View>
              <View>
                <Label style={{ color: 'black' }}>อีเมล</Label>
                <Label style={{ color: '#595E62' }}>newler55@gmail.com</Label>
              </View>
              <View>
                <Label style={{ color: 'black' }}>ชื่อผู้ใช้</Label>
                <Label style={{ color: '#595E62' }}>newler55</Label>
              </View>
            </View>
            <View style={styles.lineStyle} />

          </View>
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
  coverContainer: {
    backgroundColor: '#FFF',
    marginBottom: 0,
    paddingBottom: 0,
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4) - 100,
    width: Dimensions.get('window').width - 30,
  },
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  topicContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
})

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
        <Button
          onPress={props.goBackPage}
          vertical
          bordered
          style={{ borderColor: '#29B6F6', backgroundColor: '#29B6F6' }}>
          <Icon type="AntDesign" name="arrowleft" style={{ color: 'white', fontSize: Platform.OS === 'ios' ? 30 : 38, }} />
        </Button>
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



export interface HeadTopicProps {
  topicName?: string,
  goLinkPage?: () => void
}

const HeadTopic: React.FunctionComponent<HeadTopicProps> = props => {
  return (
    <>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <View>
          <Text
            style={{
              fontSize: Platform.OS === 'ios' ? 25 : 25,
              color: 'black',
              fontWeight: 'bold',
            }}>
            {props.topicName}
          </Text>
        </View>
        <View>
          <Button transparent onPress={props.goLinkPage} style={{ marginBottom: 0, paddingBottom: 0 }}>
            <Text

              style={{
                fontSize: Platform.OS === 'ios' ? 18 : 18,
                color: '#3575D3',
                fontWeight: 'bold',
              }}>
              เเก้ไข
        </Text>
          </Button>
        </View>
      </View>
    </>
  )
}
