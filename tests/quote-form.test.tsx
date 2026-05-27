import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuoteForm } from "@/components/quote-form";

describe("QuoteForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("requires name, phone, and service", async () => {
    const user = userEvent.setup();
    render(<QuoteForm endpoint="https://formspree.io/f/test" />);
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(screen.getByLabelText(/name/i)).toBeRequired();
    expect(screen.getByLabelText(/phone/i)).toBeRequired();
    expect(screen.getByLabelText(/service/i)).toBeRequired();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits valid form to the configured endpoint", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 200 }));
    const user = userEvent.setup();
    render(<QuoteForm endpoint="https://formspree.io/f/test" />);
    await user.type(screen.getByLabelText(/name/i), "Jane Homeowner");
    await user.type(screen.getByLabelText(/phone/i), "586-555-0100");
    await user.selectOptions(screen.getByLabelText(/service/i), "power-washing");
    await user.type(screen.getByLabelText(/message/i), "Driveway and sidewalk.");
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/test");
    expect(init?.method).toBe("POST");
    expect(await screen.findByText(/thanks/i)).toBeInTheDocument();
  });

  it("shows an error state when the endpoint returns non-2xx", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 500 }));
    const user = userEvent.setup();
    render(<QuoteForm endpoint="https://formspree.io/f/test" />);
    await user.type(screen.getByLabelText(/name/i), "Jane");
    await user.type(screen.getByLabelText(/phone/i), "586-555-0100");
    await user.selectOptions(screen.getByLabelText(/service/i), "painting");
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(/couldn.t send/i)).toBeInTheDocument();
  });

  it("ignores bots that fill the honeypot field", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 200 }));
    const user = userEvent.setup();
    render(<QuoteForm endpoint="https://formspree.io/f/test" />);
    await user.type(screen.getByLabelText(/name/i), "Jane");
    await user.type(screen.getByLabelText(/phone/i), "586-555-0100");
    await user.selectOptions(screen.getByLabelText(/service/i), "lawn-care");
    const honeypot = document.querySelector('input[name="company"]') as HTMLInputElement;
    honeypot.value = "spammer";
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(await screen.findByText(/thanks/i)).toBeInTheDocument();
  });
});
