import { Quote } from '../components/Quote'
import signinStyles from './Signin.module.css'
import { Auth } from '../components/Auth'

export const Signin = () => {

  return (
    <div className={signinStyles.main}>
      <div className={signinStyles.leftPart}>
        <Auth type="signin"/>
      </div>
      <div className={signinStyles.rightPart}>
        <Quote />
      </div>
    </div>
  )
}