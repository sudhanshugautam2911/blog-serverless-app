// import quoteStyles from './Quote.module.css'
import signinStyles from '../pages/Signin.module.css'

export const Quote = () => {
    return (
        <blockquote className={signinStyles.quote}>"The customer service I received was expectional. The Support team went above and beyond to address my concerns."
            <footer className={signinStyles.author}>
                <cite>Jules Winnfield</cite><br />
                <span>CEO, Acme Inc</span>
            </footer>
        </blockquote>
    )
}
