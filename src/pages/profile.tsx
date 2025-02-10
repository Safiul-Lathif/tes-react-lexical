// pages/profile.tsx
import React from 'react';
import styled from 'styled-components';

// --- Components ---
const Header = () => (
  <HeaderContainer>
    <Logo>RESEARCH PICK</Logo>
    <RightContent>
      <ProjectDropdown>Project</ProjectDropdown>
      <LogoutButton>Logout</LogoutButton>
    </RightContent>
  </HeaderContainer>
);

const ProfileCard: React.FC<{ name: string; email: string; lastUpdate: string }> = ({ name, email, lastUpdate }) => (
  <CardContainer>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    <ProfileImage src="https://media.licdn.com/dms/image/v2/C4D03AQFdX9FHzdCSYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1646324063549?e=1744243200&v=beta&t=0fWXGZOdxmZ8Xh255N5WSQB6jrfjGpS4i0dpX2sn2lE" alt="Profile" /> {/* Replace with actual path */}
    <CardDetails>
      <Name>{name}</Name>
      <span style={{
          "color": "#777",
          "fontSize": "14px",
          "fontWeight":"300",
          "marginTop": "3px",
          "letterSpacing": "0.4px"
  
      }}>{email}</span>
    </CardDetails>
    </div>
    <LastUpdate>last update {lastUpdate}</LastUpdate>
  </CardContainer>
);

const DetailsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <DetailsContainer>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </DetailsContainer>
);

const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <DetailItemContainer>
    <Label>{label}:</Label>
    <Value>{value}</Value>
  </DetailItemContainer>
);

const LinkedAccounts = () => (
  <LinkedAccountsContainer>
    <SectionTitle>Linked Accounts</SectionTitle>
    <GoogleLink>
      <GoogleIcon src={'https://img.icons8.com/color/48/000000/google-logo.png'} alt="Google" /> {/* Replace with actual path */}
      <GoogleText>Google</GoogleText>
      <UnlinkButton>Unlink</UnlinkButton>
    </GoogleLink>
  </LinkedAccountsContainer>
);

const ProfileScreen = () => {
  const userData = {
    name: 'Safiul Lathif',
    email: 'safiullathif65@gmail.com',
    lastUpdate: 'January 10',
    mobile: '+11 123 1234 123',
    location: 'New York',
    country: 'United States',
    university: 'Harvard University',
    department: 'Health',
    specialist: 'Heart',
    timeZone: 'Washington, DC, USA SOMT-60',
  };

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ProfileCard
          name={userData.name}
          email={userData.email}
          lastUpdate={userData.lastUpdate}
        />

        <TwoColumns>
          <DetailsSection title="Personal Information">
            <DetailItem label="Full Name" value={userData.name} />
            <DetailItem label="Mobile" value={userData.mobile} />
            <DetailItem label="Email" value={userData.email} />
            <DetailItem label="Location" value={userData.location} />
            <DetailItem label="Country" value={userData.country} />
          </DetailsSection>

          <DetailsSection title="Other Information">
            <DetailItem label="University" value={userData.university} />
            <DetailItem label="Department" value={userData.department} />
            <DetailItem label="Specialist" value={userData.specialist} />
            <DetailItem label="Time Zone" value={userData.timeZone} />
          </DetailsSection>
        </TwoColumns>

        <LinkedAccounts />

        <DeleteAccountButton>Need to leave? Delete your account</DeleteAccountButton>
      </ContentContainer>
    </PageContainer>
  );
};

export default ProfileScreen;


// --- STYLES ---  (Customize these extensively)
const PageContainer = styled.div`
  font-family: sans-serif; /* Example */
  background-color: #f7f9fa;  /* Example */
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
`;

const RightContent = styled.div`
  display: flex;
  gap: 10px;
`;

const ProjectDropdown = styled.button`
  /* Style as a dropdown */
`;

const LogoutButton = styled.button`
  /* Style as a button */
`;

const ContentContainer = styled.div`
  padding: 20px;
  max-width: 960px; /* Example */
  margin: 0 auto;
  flex: 1; /* Makes the content expand to fill available space */
`;

const CardContainer = styled.div`
  background-color: #fff;
  padding: 15px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const ProfileImage = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 20%;
  margin-right: 20px;
`;

const CardDetails = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
`;

const Name = styled.h3`
  margin: 0;
  letterSpacing: "0.4px"

`;

const Email = styled.p`
  color: #777;
  font-size: 0.9rem;
`;

const LastUpdate = styled.p`
  color: #777;
  font-size: 0.8rem;
`;

const TwoColumns = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const DetailsContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1; /* Distribute columns equally */
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
`;

const DetailItemContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Label = styled.dt`
  font-weight: bold;
  width: 120px; /* Adjust as needed */
`;

const Value = styled.dd`
  margin: 0;
  flex: 1;
`;

const LinkedAccountsContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const GoogleLink = styled.div`
  display: flex;
  align-items: center;
`;

const GoogleIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const GoogleText = styled.span`
  flex: 1;
`;

const UnlinkButton = styled.button`
  /* Style as a button */
`;

const DeleteAccountButton = styled.button`
  background-color: #f00; /* Example red */
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;