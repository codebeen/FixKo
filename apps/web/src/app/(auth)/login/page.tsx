"use client";

import { Text, Button, Box, TextInput, PasswordInput, Group, Anchor } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import { useState } from "react";
import BaseAuth from "../../components/layout/BaseAuth";
import { sileo } from '../../utils/Alert.js';
import { validateEmail, validatePassword } from '../../utils/Validation.js';

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: validateEmail,
      password: validatePassword,
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      sileo.success("Successfully logged in!");
      router.push("/dashboard");
    } catch (err) {
      sileo.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseAuth>
      <Text fw={600} style={{ fontSize: 24 }} c="#061C48" ta="center">Login</Text>

      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} w="100%">
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          required
          {...form.getInputProps('email')}
          onChange={(event) => {
            const val = event.currentTarget.value.replace(/\s/g, '');
            form.setFieldValue('email', val);
          }}
          styles={{
            label: { color: '#1A1A2E', fontWeight: 500, fontSize: '11px' },
            input: { fontSize: '11px', '&::placeholder': { fontSize: '11px' } }
          }}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          required
          mt="md"
          {...form.getInputProps('password')}
          onChange={(event) => {
            const val = event.currentTarget.value.replace(/\s/g, '').slice(0, 128);
            form.setFieldValue('password', val);
          }}
          styles={{
            label: { color: '#1A1A2E', fontWeight: 500, fontSize: '11px' },
            innerInput: { fontSize: '11px', '&::placeholder': { fontSize: '11px' } }
          }}
        />

        <Group justify="flex-end" mt="xs">
          <Anchor
            component="button"
            type="button"
            c="#061C48"
            style={{ fontSize: '11px' }}
            onClick={() => router.push("/enter-email")}
          >
            Forgot Password?
          </Anchor>
        </Group>

        <Button fullWidth mt="lg" type="submit" color="#061C48" radius="sm" loading={loading} disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </Button>

      </Box>
    </BaseAuth>
  );
}

export default Login;