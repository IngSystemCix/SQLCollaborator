import { render } from '@testing-library/react';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
    it('renders without crashing', () => {
        render(<ConfirmDialog />);
    });
});
