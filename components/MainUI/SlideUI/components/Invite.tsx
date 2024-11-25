import React from "react";
import { TextInput, Button, ProgressBar } from "react95";
import { Card, FlexBox } from "../styles";

export default function Invite() {
    return (
        <FlexBox direction="column" style={{ alignItems: 'stretch', padding: 0 }}>
            <Card style={{ marginBottom: '16px' }}>
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
                <FlexBox direction="column" style={{ gap: '12px', alignItems: 'stretch' }}>
                    <FlexBox style={{ justifyContent: 'space-between' }}>
                        <span>Invited: 3</span>
                        <span>Target: 5</span>
                    </FlexBox>
                    <ProgressBar value={60} variant="tile" />
                    <Button style={{ width: '100%' }}>
                        Claim Reward
                    </Button>
                </FlexBox>
            </Card>
        </FlexBox>
    )
}