import { test, expect } from "@playwright/test";

// Helper: complete assessment quickly
async function completeAssessment(page: import("@playwright/test").Page, name: string, pattern: "a" | "b" | "alternate" = "alternate") {
  await page.goto("/assessment");
  await page.evaluate(() => {
    localStorage.removeItem("assessment_progress");
    localStorage.removeItem("pending_team_id");
  });
  await page.reload();
  await page.fill("#name", name);
  await page.click("button[type=submit]");
  await expect(page.locator("text=Q1")).toBeVisible();

  for (let i = 0; i < 40; i++) {
    let key: string;
    if (pattern === "a") key = "a";
    else if (pattern === "b") key = "b";
    else key = i % 2 === 0 ? "a" : "b";
    await page.keyboard.press(key);
    await page.waitForTimeout(350);
  }

  await page.waitForURL(/\/result\//, { timeout: 20000 });
}

test.describe("Founder Personality Assessment - Full E2E", () => {
  test("1. Landing page loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("창업자 성향 테스트");
    await expect(page.locator("text=40개의 질문으로")).toBeVisible();
    await expect(page.locator("text=시작하기")).toBeVisible();
  });

  test("2. Navigate from landing to assessment", async ({ page }) => {
    await page.goto("/");
    await page.click("text=시작하기");
    await expect(page).toHaveURL("/assessment");
    await expect(page.locator("text=시작하기 전에")).toBeVisible();
    await expect(page.locator("#name")).toBeVisible();
  });

  test("3. Name form validation - empty name blocked", async ({ page }) => {
    await page.goto("/assessment");
    const submitButton = page.locator("button[type=submit]");
    await expect(submitButton).toBeDisabled();
  });

  test("4. Name form submission transitions to questions", async ({ page }) => {
    await page.goto("/assessment");
    await page.evaluate(() => localStorage.removeItem("assessment_progress"));
    await page.reload();
    await page.fill("#name", "테스트유저");
    await page.fill("#email", "test@example.com");
    await page.click("button[type=submit]");
    await expect(page.locator("text=Q1")).toBeVisible();
    await expect(page.locator("text=0 / 40")).toBeVisible();
  });

  test("5. Complete full 40-question assessment and get result", async ({ page }) => {
    test.setTimeout(120000);

    await completeAssessment(page, "E2E테스트");

    // Verify result page content
    await expect(page.locator("text=E2E테스트님의 창업자 성향")).toBeVisible();
    await expect(page.locator("svg")).toBeVisible();

    // Verify personality card is shown
    const personalityTypes = ["주도적 체계형", "주도적 자유형", "신중한 체계형", "신중한 자유형"];
    const hasPersonalityType = await page.evaluate((types) => {
      return types.some((t) => document.body.textContent?.includes(t));
    }, personalityTypes);
    expect(hasPersonalityType).toBeTruthy();

    // Verify action buttons
    await expect(page.locator("text=결과 공유하기")).toBeVisible();
    await expect(page.locator("text=이미지 저장")).toBeVisible();
    await expect(page.locator("text=팀원 초대하기")).toBeVisible();
    await expect(page.locator("text=다시 하기")).toBeVisible();

    // Verify score bars are rendered (use exact match to avoid SVG text conflict)
    await expect(page.getByText("Active", { exact: true })).toBeVisible();
    await expect(page.getByText("Passive", { exact: true })).toBeVisible();
    await expect(page.getByText("Structured", { exact: true })).toBeVisible();
    await expect(page.getByText("Free", { exact: true })).toBeVisible();
  });

  test("6. localStorage persistence - resume assessment after refresh", async ({ page }) => {
    await page.goto("/assessment");
    await page.evaluate(() => localStorage.removeItem("assessment_progress"));
    await page.reload();

    // Fill name
    await page.fill("#name", "저장테스트");
    await page.click("button[type=submit]");
    await expect(page.locator("text=Q1")).toBeVisible();

    // Answer 5 questions
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("a");
      await page.waitForTimeout(400);
    }

    // Should be on Q6
    await expect(page.locator("text=Q6")).toBeVisible();
    await expect(page.locator("text=5 / 40")).toBeVisible();

    // Refresh page
    await page.reload();

    // Should restore — verify we're still in questions phase with progress
    // The exact question shown may vary, but we should have 5 answered
    await expect(page.locator("text=5 / 40")).toBeVisible({ timeout: 10000 });
  });

  test("7. Keyboard navigation - go back with ArrowLeft", async ({ page }) => {
    await page.goto("/assessment");
    await page.evaluate(() => localStorage.removeItem("assessment_progress"));
    await page.reload();

    await page.fill("#name", "네비테스트");
    await page.click("button[type=submit]");
    await expect(page.locator("text=Q1")).toBeVisible();

    // Answer Q1
    await page.keyboard.press("a");
    await page.waitForTimeout(400);
    await expect(page.locator("text=Q2")).toBeVisible();

    // Go back
    await page.keyboard.press("ArrowLeft");
    await page.waitForTimeout(400);
    await expect(page.locator("text=Q1")).toBeVisible();
  });

  test("8. Button click answers work", async ({ page }) => {
    await page.goto("/assessment");
    await page.evaluate(() => localStorage.removeItem("assessment_progress"));
    await page.reload();

    await page.fill("#name", "클릭테스트");
    await page.click("button[type=submit]");
    await expect(page.locator("text=Q1")).toBeVisible();

    // Click option A button
    const optionA = page.locator("button").filter({ hasText: "A" }).first();
    await optionA.click();
    await page.waitForTimeout(400);
    await expect(page.locator("text=Q2")).toBeVisible();

    // Click option B button
    const optionB = page.locator("button").filter({ hasText: "B" }).first();
    await optionB.click();
    await page.waitForTimeout(400);
    await expect(page.locator("text=Q3")).toBeVisible();
  });

  test("9. Result page - copy link button works", async ({ page, context }) => {
    test.setTimeout(120000);
    await completeAssessment(page, "공유테스트");

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.click("text=결과 공유하기");
    await expect(page.locator("text=복사됨!")).toBeVisible();

    const url = page.url();
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toBe(url);
  });

  test("10. Team creation flow", async ({ page }) => {
    test.setTimeout(120000);
    await completeAssessment(page, "팀장테스트");

    const resultUrl = page.url();
    const resultId = resultUrl.split("/result/")[1];
    expect(resultId).toBeTruthy();

    // Click team invite button
    await page.click("text=팀원 초대하기");
    await page.waitForURL(/\/team\/new/);
    expect(page.url()).toContain(`resultId=${resultId}`);

    // Fill team name
    await page.fill("#teamName", "테스트팀");
    await page.click("text=팀 생성하기");
    await page.waitForURL(/\/team\/[0-9a-f]{8}-/, { timeout: 15000 });

    // Verify team page
    await expect(page.locator("h1")).toContainText("테스트팀");
    await expect(page.locator("text=팀원 1명")).toBeVisible();
    await expect(page.locator("svg")).toBeVisible();

    // Verify member list shows the creator (use member list link, not SVG text)
    await expect(page.locator("a").filter({ hasText: "팀장테스트" })).toBeVisible();
    await expect(page.locator("text=초대 링크")).toBeVisible();
  });

  test("11. Team join flow", async ({ page }) => {
    test.setTimeout(180000);

    // Create a team first
    await completeAssessment(page, "창립자둘");
    await page.click("text=팀원 초대하기");
    await page.waitForURL(/\/team\/new/);
    await page.fill("#teamName", "합류팀");
    await page.click("text=팀 생성하기");
    // Wait for team page (UUID pattern, not /team/new)
    await page.waitForURL(/\/team\/[0-9a-f]{8}-/, { timeout: 15000 });

    // Extract teamId
    const teamUrl = page.url();
    const teamId = teamUrl.match(/\/team\/([0-9a-f-]+)/)?.[1]!;
    expect(teamId).toBeTruthy();

    // Navigate to join page
    await page.goto(`/team/${teamId}/join`);
    await expect(page.locator("text=초대받으셨습니다")).toBeVisible({ timeout: 15000 });

    // Click join
    await page.click("text=참여하기");
    await page.waitForURL("/assessment");

    // Verify pending_team_id was stored
    const pendingTeamId = await page.evaluate(() => localStorage.getItem("pending_team_id"));
    expect(pendingTeamId).toBe(teamId);

    // Complete assessment as a new team member — don't clear pending_team_id!
    await page.evaluate(() => localStorage.removeItem("assessment_progress"));
    // Verify pending_team_id survived
    const teamIdCheck = await page.evaluate(() => localStorage.getItem("pending_team_id"));
    expect(teamIdCheck).toBe(teamId);

    await page.reload();
    await page.fill("#name", "합류자둘");
    await page.click("button[type=submit]");
    await expect(page.locator("text=Q1")).toBeVisible();

    for (let i = 0; i < 40; i++) {
      await page.keyboard.press("b");
      await page.waitForTimeout(300);
    }

    // Should redirect to team page (since pending_team_id was set)
    await page.waitForURL(/\/team\//, { timeout: 20000 });

    // Verify the URL is the correct team
    expect(page.url()).toContain(teamId);

    // Verify via API that both members exist (retry for DB propagation)
    let apiData: { members: { name: string }[] } = { members: [] };
    for (let attempt = 0; attempt < 5; attempt++) {
      const apiRes = await page.request.get(`/api/teams/${teamId}`);
      apiData = await apiRes.json();
      if (apiData.members.length >= 2) break;
      await page.waitForTimeout(2000);
    }
    expect(apiData.members.length).toBe(2);
    const memberNames = apiData.members.map((m: { name: string }) => m.name);
    expect(memberNames).toContain("창립자둘");
    expect(memberNames).toContain("합류자둘");

    // Reload to get fresh data and verify UI
    await page.reload();
    await expect(page.locator("text=팀원 2명")).toBeVisible({ timeout: 20000 });
    await expect(page.locator("a").filter({ hasText: "창립자둘" })).toBeVisible();
    await expect(page.locator("a").filter({ hasText: "합류자둘" })).toBeVisible();
  });

  test("12. 404 page for invalid result", async ({ page }) => {
    await page.goto("/result/00000000-0000-0000-0000-000000000000");
    await expect(page.locator("text=404")).toBeVisible({ timeout: 10000 });
  });

  test("13. 404 page for non-existent route", async ({ page }) => {
    await page.goto("/nonexistent");
    await expect(page.locator("text=404")).toBeVisible();
  });

  test("14. Retake button clears progress and restarts", async ({ page }) => {
    test.setTimeout(120000);
    await completeAssessment(page, "재시도테스트");

    await page.click("text=다시 하기");
    await page.waitForURL("/assessment");
    await expect(page.locator("text=시작하기 전에")).toBeVisible();
  });

  test("15. Result API returns correct data", async ({ request }) => {
    const postRes = await request.post("/api/results", {
      data: {
        name: "API테스트",
        email: "api@test.com",
        answers: Object.fromEntries(
          Array.from({ length: 40 }, (_, i) => [i + 1, i % 2 === 0 ? "A" : "B"])
        ),
      },
    });
    expect(postRes.ok()).toBeTruthy();
    const { id } = await postRes.json();

    const getRes = await request.get(`/api/results/${id}`);
    expect(getRes.ok()).toBeTruthy();
    const result = await getRes.json();

    expect(result.name).toBe("API테스트");
    expect(result.email).toBe("api@test.com");
    expect(result.activeScore + result.passiveScore).toBe(20);
    expect(result.structuredScore + result.freeScore).toBe(20);
  });

  test("16. Mobile viewport renders correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("text=시작하기")).toBeVisible();

    await page.click("text=시작하기");
    await expect(page.locator("#name")).toBeVisible();

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375);
  });
});
