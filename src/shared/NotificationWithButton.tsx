import { FC, ReactNode } from 'react';
import { Button, Notification } from '@mantine/core';

type NotificationWithButtonProps = {
  mt?: string;
  icon: ReactNode;
  color: 'teal' | 'red';
  title: null | string;
  onClick: () => void;
  children: ReactNode;
};

export const NotificationWithButton: FC<NotificationWithButtonProps> = ({
  mt,
  icon,
  color,
  title,
  onClick,
  children,
}) => {
  return (
    <Notification icon={icon} withCloseButton={false} color={color} title={title} mt={mt}>
      <Button onClick={onClick}>{children}</Button>
    </Notification>
  );
};
