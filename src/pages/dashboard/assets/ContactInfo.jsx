import containers from './containers.module.css'

export const ContactInfo = () => {
    return (
        <div className={containers.customBlockContact}>
            <h6>Need help?</h6>
            <h6>Please submit a request</h6>

            <p style={{ marginTop: '1em' }}>
                <strong>Get in touch:</strong>
                <a href="tel: 305-240-9671">(60) 305-240-9671</a>
            </p>
        </div>
    )
}
