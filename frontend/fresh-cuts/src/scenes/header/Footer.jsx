import {useContext} from "react";
import {
	Box,
	FooterContainer,
	Row,
	Column,
	FooterLink,
	FooterLinkYear,
	Heading,
} from "./FooterStyles";
import Image from "../../pictures/redsalonart.png";
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import InstagramIcon from '@mui/icons-material/Instagram';
import PlaceIcon from '@mui/icons-material/Place';
import "./Footer.css";

import { AuthContext } from "../../AuthContext";

import {Link} from "react-router-dom"


const Servicepage = ['Services']

const Footer = () => {

	const { userRole } = useContext(AuthContext);

	return (

		
		<Box>
			{(userRole !== "Stylist" && 
				<FooterContainer>
				<Row>
					<Column>
						
                        <img className="picture" src={Image}/>
						
						<FooterLinkYear>
							&copy;{new Date().getFullYear()} <br/> All right reserved.
                        </FooterLinkYear>
					</Column>


					<Column>
						<Heading>About</Heading>
						<FooterLink href="/">
							Profile
						</FooterLink>

						<FooterLink href="/Services">
							Services
						</FooterLink>
					</Column>


					<Column>
						<Heading>Contact</Heading>
						<FooterLink href="#">
                            <LocalPhoneIcon/> (916) 451 - 1517
						</FooterLink>
						<FooterLink href="#">
                            <MailIcon/> redsalonart@gmail.com
						</FooterLink>
						<FooterLink href="#">
                            <InstagramIcon/> @RedsalonArt
						</FooterLink>
					</Column>


					<Column>
						<Heading>Address</Heading>
						<FooterLink href="#">
                            <span
                                style={{
                                    marginLeft: "0 px",
                                }}
                            >
                                <PlaceIcon/>3801 J St. Sacramento, CA 95816
                            </span>
						</FooterLink>
					</Column>


				</Row>
			</FooterContainer>
			
			)}
			
		</Box>
	);
};
export default Footer;

