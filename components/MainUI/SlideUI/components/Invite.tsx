import React from "react";
import { TextInput, Button, ProgressBar } from "react95";
import { Card, FlexBox, ContentWrapper } from "../styles";

export default function Invite() {
    return (
        <ContentWrapper>
            <Card>
                <p style={{ margin: '0 0 12px 0' }}>Invite Code: ABC123XYZ</p>
                <FlexBox>
                    <TextInput
                        value="https://game.com/invite/ABC123XYZ"
                        disabled
                        style={{ flex: 1 }}
                    />
                    <Button>Copy</Button>
                </FlexBox>
            </Card>

            <Card>
                <FlexBox direction="column" style={{ gap: '12px' }}>
                    <FlexBox style={{ justifyContent: 'space-between', width: '100%' }}>
                        <span>Invited: 3</span>
                        <span>Target: 5</span>
                    </FlexBox>
                    <ProgressBar value={60} variant="tile" />
                    <Button style={{ width: '100%' }}>
                        Claim Reward
                    </Button>
                </FlexBox>
            </Card>
        </ContentWrapper>
    )
}