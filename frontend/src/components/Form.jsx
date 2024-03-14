import React from 'react';
import styles from './css/Form.module.css'; // Import your CSS module

function Form() {
    return (
        <div className={styles['user-form-body']}>
            <video autoPlay muted loop src="stuff/1.mp4" className={styles['user-form-video']}></video>

            <div className={styles['user-form-container']}>
                <h2 className={styles['user-form-h2']}>FORM</h2>
                <form action="#" method="post">
                    <div className={styles['user-form-group']}>
                        <input type="text" id="voter_id" name="voter_id" placeholder="Voter ID number " className={styles['user-form-input']} required />
                    </div>
                    <div className={styles['user-form-group']}>
                        <input type="text" id="aadhar_card" name="aadhar_card" placeholder="Aadhar card number " className={styles['user-form-input']} required />
                    </div>
                    <div className={styles['user-form-group']}>
                      
                        <input type="text" id="passport" name="passport" placeholder="Passport number" className={styles['user-form-input']} required />
                    </div>
                    <div className={styles['user-form-group']}>
                        <input type="text" id="pan_card" name="pan_card" placeholder="PAN card number " className={styles['user-form-input']} required />
                    </div>
                    <input type="submit" value="Submit" className={styles['user-form-submit']} />
                </form>
            </div>
        </div>
    );
}

export default Form;
