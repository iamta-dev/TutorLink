import React from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, StatusBar, Platform, ScrollView } from "react-native"
// import { useStores } from "../models/root-store"
import { NavigationScreenProp } from "react-navigation"
import {
  Header,
  Text,
  View,
  Button,
  Icon,
  Item,
  Input,
  Form,
  Row,
  Container
} from 'native-base';

export interface ProfileDataScreenProps {
  navigation: NavigationScreenProp<{}>
}

export const ProfileDataScreen: React.FunctionComponent<ProfileDataScreenProps> = observer((props) => {

  const { navigation } = props
  const goBack = React.useMemo(() => () => navigation.goBack(null), [props.navigation])

  return (
    <>
      <Container style={{ backgroundColor: '#fcfcfc' }}>
        {/* light-content ,dark-content*/}
        <StatusBar backgroundColor="#29B6F6" barStyle="light-content" />
        <HeadBer theme="#29B6F6" title='ตั้งค่าข้อมูลหน้าโปรไฟล์' goBackPage={() => goBack()} />

        <ScrollView>
          <View>
            <Form style={{ marginHorizontal: 20, marginVertical: 10 }}>
              <Item regular style={{ margin: 7, marginRight: 0 }}>
                <Icon type="Entypo" name="graduation-cap" />
                <Input
                  placeholder="กรอกชื่อมหาวิทยาลัย"
                  style={{ fontSize: 16, paddingLeft: 0 }}
                />
              </Item>
              <Item regular style={{ margin: 7, marginRight: 0 }}>
                <Icon type="FontAwesome" name="phone" />
                <Input
                  placeholder="กรอกเบอร์โทรศัพท์"
                  style={{ fontSize: 16, paddingLeft: 0 }}
                />
              </Item>
              <Item regular style={{ margin: 7, marginRight: 0 }}>
                <Icon type="FontAwesome" name="child" />
                <Input
                  placeholder="กรอกวันเดือนปีเกิด ex.07/04/1998"
                  style={{ fontSize: 16, paddingLeft: 0 }}
                />
              </Item>
              {/* <Item regular style={{ margin: 7, marginRight: 0}}>
              <Button onPress={() => goBack()} transparent >
                <Icon type="FontAwesome" name="child" style={{color: 'black',marginLeft: 10,marginRight: 10}} />
                <Text style={{ fontSize: 16, paddingLeft: 0,color:'#575757' }}
                >กรอกวันเดือนปีเกิด ex.07/04/1998</Text>
              </Button>
            </Item> */}

              <Row style={{ marginTop: 30, alignSelf: 'center' }}>
                <Button primary >
                  <Text>บันทึก</Text>
                </Button>
                <Button onPress={() => goBack()} danger style={{ marginLeft: 10 }}>
                  <Text>ยกเลิก</Text>
                </Button>
              </Row>
            </Form>

          </View>
        </ScrollView>

      </Container>
    </>
  )
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
