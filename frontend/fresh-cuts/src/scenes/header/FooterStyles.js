import styled from "styled-components";

export const Box = styled.div`
	padding: 0% 2.5%;
	background: white;
	bottom: 0;
	width: 95%;
    box-shadow: 0px 1px 5px 1px grey;

	@media (max-width: 1000px) {
		// padding: 70px 30px;
	}
	// position: absolute;
	// background: purple;
`;

export const FooterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1400px;
	margin: 0 auto;
	//background: red;
`;

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	text-align: left;
	margin-left: 0px;
    //background: blue;
`;

export const Row = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fill,
		minmax(155px, 1fr)
	);
	grid-gap: 11.5%;

	@media (max-width: 1000px) {
		grid-template-columns: repeat(
			auto-fill,
			minmax(200px, 12fr)
		);
		grid-gap: 0px;
	}

	@media (max-width: 842px) {
		grid-template-columns: repeat(
			auto-fill,
			minmax(23%, 0fr)
		);
		grid-gap: 10px;
	}

	@media (max-width: 599px) {
		grid-template-columns: repeat(
			auto-fill,
			minmax(170px, 12fr)
		);
		grid-gap: 31px;
	}

  @media (max-width: 410px) {
		grid-template-columns: repeat(
			auto-fill,
			minmax(170px, 12fr)
		);
		grid-gap: 0px;
	}

    //background: yellow;
`;

export const FooterLink = styled.a`
    color: #4B5A69;
	margin-bottom: 20px;
	font-size: 18px;
	text-decoration: none;

	&:hover {
		color: #E95252;
		transition: 200ms ease-in;
	}

	@media (max-width: 1000px) {
		font-size: 15px;
	}

	@media (max-width: 787px) {
		font-size: 10px;
	}

	@media (max-width: 599px) {
		font-size: 15px;
	}

	@media (max-width: 375px) {
		font-size: 12px;
	}
  
`;

export const FooterLinkYear = styled.a`
    color: #4B5A69;
	margin-bottom: 20px;
	font-size: 17px;
	text-decoration: none;

	@media (max-width: 1000px) {
		font-size: 15px;
	}

	@media (max-width: 375px) {
		font-size: 12px;
	}
`;

export const Heading = styled.p`
	font-size: 27px;
	color: #E95252;
	margin-bottom: 25px;
	font-weight: bold;

	@media (max-width: 1000px) {
		margin-bottom: 13px;
		font-size: 20px;
	}

	@media (max-width: 375px) {
		font-size: 16px;
	}
`;
