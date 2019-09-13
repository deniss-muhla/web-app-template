import React, { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { AvailablePetsProps } from './state';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Pet } from '../../api/__generated__';
import _ from 'lodash';
import { Trans } from '@lingui/macro';

const AvailablePets: FunctionComponent<PropsWithChildren<AvailablePetsProps>> = ({ init, pets }) => {
    useEffect(() => {
        init();
    }, [init]);

    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Trans>Name</Trans>
                        </TableCell>
                        <TableCell>
                            <Trans>Category</Trans>
                        </TableCell>
                        <TableCell>
                            <Trans>Id</Trans>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {_.map(_.take(pets, 100), (pet: Pet) => (
                        <TableRow key={pet.id}>
                            <TableCell component="th" scope="row">
                                {pet.name}
                            </TableCell>
                            <TableCell>{_.get(pet, 'category.name', '')}</TableCell>
                            <TableCell>{pet.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

AvailablePets.displayName = 'AvailablePets';

export default AvailablePets;
