import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='col-md-12 background_footer pt-4 pb-1'>
            <div className='row'>
                <div className='col-md-4 col-4 text-center'>
                    {/* <p className='fae--text'>About Expert</p> */}
                    {/* <p className='fae--text'>Contact Us</p> */}
                    <p className='mb-0 fae--text'><Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} href="/auth/Termsandcondition">Terms & Conditions</Link></p>

                </div>
                <div className='col-md-4 col-4 text-center'>
                    <p className='mb-0 fae--text'><Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} href="/auth/Cookies">Cookies Policy</Link></p>

                    {/* <p className='fae--text'>Become an Expert</p> */}
                    {/* <p className='fae--text'>Blog</p> */}
                </div>
                <div className='col-md-4 col-4 text-center'>
                    <p className='mb-0 fae--text'><Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} href="/auth/Privacypolicy">Privacy Policy</Link></p>
                    {/* <p className='fae--text'>Legal</p> */}

                </div>
            </div>
            {/* <div className='row'>
                <div className='col-md-4 col-4 text-center'>
                    <p className='fae--text'><Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} href="https://expert.one/Service/prp-hair-regrowth?service=PR-42915222" target='_blank'>PRP Hair Regrowth</Link></p>

                </div>
                <div className='col-md-4 col-4 text-center'>
                    <p className='fae--text'><Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} href="https://expert.one/Service/laser-hair-removal-london?service=La-1139493" target='_blank'>Laser Hair Removal</Link></p>
                </div>
                <div className='col-md-4 col-4 text-center'>
                    <p className='fae--text'><Link style={{ textDecoration: "none", color: "black", cursor: "pointer" }} href="https://expert.one/Service/herbal-peel?service=He-68219543" target='_blank'>Herbal Peel</Link></p>
                 </div>
            </div> */}
            <hr />
            <div className='col-md-12 text-center'>
                <Link href="https://www.youtube.com/channel/UCCr1Cv5QiiGsEztlFYG8OQw" target='_blank'>
                    <img className='img-fluid footer_images px-md-2 px-1' src='/imagess/youtube_icon.svg' />
                </Link>
                <Link href="https://www.pinterest.co.uk/ExpertAppUK/" target='_blank'>
                    <img className='img-fluid footer_images px-md-2 px-1' src='/imagess/pinterest_icon.svg' />
                </Link>
                <Link href="https://www.instagram.com/expertpakistan/" target='_blank'>
                    <img className='img-fluid footer_images px-md-2 px-1' src='/imagess/instagram_icon.svg' />
                </Link>
                <Link href="https://www.linkedin.com/company/expertpakistan/" target='_blank'>
                    <img className='img-fluid footer_images px-md-2 px-1' src='/imagess/linkedin_icon.svg' />
                </Link>
                <Link href="https://twitter.com/expertpakistan" target='_blank'>
                    <img className='img-fluid footer_images px-md-2 px-1' src='/imagess/twitter_icon.svg' />
                </Link>
                <Link href="https://www.facebook.com/ExpertAppPak" target='_blank'>
                    <img className='img-fluid footer_images px-md-2 px-1' src='/imagess/facebook_icon.svg' />
                </Link>
            </div>
            <hr />
            <div className='col-md-12 text-center'>
                <img className='img-fluid' src='/imagess/expert_logo_full.png' />
                <p className='fae--textt'>© 2023 Selteq Ltd.</p>
            </div>
        </div>
    )
}

export default Footer