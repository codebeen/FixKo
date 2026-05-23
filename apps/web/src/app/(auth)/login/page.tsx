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
            label: { color: '#1A1A2E', fontWeight: 500, fontSize: '12px' },
            input: { fontSize: '12px', '&::placeholder': { fontSize: '12px' } }
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
            label: { color: '#1A1A2E', fontWeight: 500, fontSize: '12px' },
            innerInput: { fontSize: '12px', '&::placeholder': { fontSize: '12px' } }
          }}
        />

        <Group justify="flex-end" mt="xs">
          <Anchor
            component="button"
            type="button"
            c="#061C48"
            style={{ fontSize: '12px' }}
            onClick={() => router.push("/enter-email")}
          >
            Forgot Password?
          </Anchor>
        </Group>

        <style>{`
          .login-btn {
            transition: all 0.2s ease !important;
          }
          .login-btn:hover {
            background-color: #0b2763 !important;
            transform: translateY(-2px) !important;
            box-shadow: 0 4px 12px rgba(6, 28, 72, 0.3) !important;
          }
          .login-btn:active {
            transform: translateY(0) !important;
            box-shadow: none !important;
          }
        `}</style>
        <Button 
          className="login-btn"
          fullWidth 
          mt="lg" 
          type="submit" 
          color="#061C48" 
          radius="sm" 
          loading={loading} 
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </Button>

      </Box>
    </BaseAuth>
  );
}

export default Login;