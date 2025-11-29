package com.example.store;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class HomeControllerTest {

    @Test
    void homeReturnsExpectedMessage() {
        // Arrange
        HomeController controller = new HomeController();

        // Act
        String result = controller.home();

        // Assert
        assertThat(result)
            .isNotNull()
            .containsIgnoringCase("store")
            .contains("backend");
    }
}
