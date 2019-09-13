import React, { FunctionComponent, PropsWithChildren } from 'react';
import { AboutProps } from './state';
import { withI18n, withI18nProps } from '@lingui/react';
import { Trans, t } from '@lingui/macro';
import { IconButton, Link, Typography, Fab, Tooltip } from '@material-ui/core';
import { GithubCircle as GithubIcon } from 'mdi-material-ui';

const About: FunctionComponent<PropsWithChildren<AboutProps & withI18nProps>> = ({ i18n, version, updateVersion }) => {
    return (
        <>
            <Tooltip placement={'top'} title={i18n._(t`View the source on GitHub`)}>
                <Link href={'https://github.com/deniss-muhla/web-app-template'}>
                    <Fab color={'default'} size={'small'} aria-label="github">
                        <GithubIcon />
                    </Fab>
                </Link>
            </Tooltip>
            &nbsp;
            <Typography>
                <Trans>Project version: {version}</Trans>
            </Typography>
        </>
    );
};

About.displayName = 'About';

export default withI18n()(About);
